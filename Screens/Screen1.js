import React from 'react'
import {View,StyleSheet,Text,Button,ScrollView,Dimensions} from 'react-native'
import {Audio} from 'expo-av'
import {store,addRecording,removeRecording,addTempRecording,removeTempRecording,clearTemp} from '../redux'
import {connect} from 'react-redux'
import Row from './Components/RecordingScreen'
import * as FileSystem from 'expo-file-system'
import { INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, INTERRUPTION_MODE_ANDROID_DUCK_OTHERS } from 'expo-av/build/Audio'
import BackgroundTimer from 'react-native-background-timer'
import { cacheDirectory } from 'expo-file-system'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

function compareTime(time1,time2)
{
    let x = new Date()
    x = x.getTime()
    time1.getTime()
    time2.getTime()
    return (x>time1 && x<time2)
}


class App extends React.Component
{
    state={
        errMessage: "",
        recording: false,
        totalTime: parseInt(this.props.settings.Recording_Time.currentValue),
    }

    init = async() =>
    {
        let x = await Audio.getPermissionsAsync()
        if (!x.granted)
            throw "ERROR"
        let y = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
        if(y.indexOf('Recordings')<0)
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+'Recordings')
    }

    start = async()=>
    {   
        this.setState({recording: true})
        this.interval = BackgroundTimer.setInterval(()=>this.recordFor(10000),10000+parseInt(this.props.settings.Wait_time.currentValue))
        this.props.clearTemp()
    }

    move = async(Name)=>
    {
        const Dir = FileSystem.documentDirectory+'Recordings/'+Name+'/'
        var uri = []
        console.log(this.props.temp)
        this.props.temp.forEach(async({RecordingUri})=>{
            console.log(RecordingUri)
            let x = RecordingUri.split("/")
            x = x[x.length -1]
            console.log(typeof RecordingUri)
            console.log(typeof Dir)
            console.log(typeof x)
            await FileSystem.moveAsync({from: RecordingUri,to: `${Dir}${x}`})
            uri.push(Dir+x)
        })
        this.props.addRecording(Name,uri)
    }

    stop = async()=>
    {
        const Name = (1+Math.random()).toString()
        this.setState({recording: false})
        BackgroundTimer.clearInterval(this.interval)

        const Dir = FileSystem.documentDirectory+'Recordings/'+Name
        await FileSystem.makeDirectoryAsync(Dir)
        this.move(Name)
        console.log(FileSystem.documentDirectory)
        console.log(await FileSystem.readDirectoryAsync(Dir))
        
    }

    removeRecording = async(uri)=>
    {
        this.props.removeTempRecording(uri)
        await FileSystem.deleteAsync(uri)
    }

    recordFor = async(duration=2000)=>
    {
        if(this.props.settings.Sleep_Time.currentValue.enable && compareTime(this.props.settings.Sleep_Time.currentValue.from, this.props.settings.Sleep_Time.currentValue.to))
            return false

        console.log('recordFor')
        const recording = new Audio.Recording()
        const x = this.props.settings.Recording_Quality.currentValue?Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY:Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
        await recording.prepareToRecordAsync(x)
        await recording.startAsync()
        
        BackgroundTimer.setInterval(async ()=>{
            const {durationMillis,canRecord} = await recording.getStatusAsync()
            if(canRecord && durationMillis>=duration)
            {
                recording.stopAndUnloadAsync()
                this.props.addTempRecording(recording.getURI())

                if(this.props.temp.length*duration>this.state.totalTime)
                    this.removeRecording(this.props.temp[0].RecordingUri)
                console.log('Done')
            }


        },100)

        return recording.getURI()
    }

    componentDidMount()
    {
        try{
            this.init()
            Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            })
        }
        catch(error){
            this.setState({errMessage: error.message})
        }
        
    }

    
    render()
    {
        return(
            <View style={styles.appContainer} >
                <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                    <Entypo name="controller-record" size={Dimensions.get('window').width/2} color={!this.state.recording?'#590000':'#FF4040'} />
                </View>

                <View style={styles.navView} >
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Settings')} >
                        <Icon name={"ios-settings-outline"} size={50} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button,{marginLeft: 50, marginRight: 50}]} onPress={this.state.recording?this.stop:this.start} >
                        <Icon name={this.state.recording?"stop-circle-outline":"radio-button-on"} size={100} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Recordings')}>
                        <Icon name="ios-list-circle-outline" size={50} color="white" />
                    </TouchableOpacity>

                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    appContainer:
    {
        flex: 1,
        backgroundColor: '#5a005a',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    button:{
        paddingBottom: 100,
        borderColor: 'white',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    navView:
    {
        borderTopWidth: 3,
        paddingTop: 30,
        borderColor: 'white',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})

const mapStateToProps = (state) =>({
    recordings: state.recording,
    temp: state.tempRecording,
    settings: state.settings,
})

export default connect(mapStateToProps,{addRecording,removeRecording,addTempRecording,removeTempRecording,clearTemp},null)(App)