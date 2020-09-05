import React from 'react'
import {View,StyleSheet,Text,Button,ScrollView} from 'react-native'
import {Audio} from 'expo-av'
import {store,addRecording,removeRecording,addTempRecording,removeTempRecording,clearTemp} from '../redux'
import {connect} from 'react-redux'
import Row from './Components/RecordingRow'
import * as FileSystem from 'expo-file-system'
import { INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, INTERRUPTION_MODE_ANDROID_DUCK_OTHERS } from 'expo-av/build/Audio'
import BackgroundTimer from 'react-native-background-timer'
import { cacheDirectory } from 'expo-file-system'


class App extends React.Component
{
    state={
        errMessage: "",
        recording: false,
        totalTime: 4000,
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
        this.interval = BackgroundTimer.setInterval(()=>this.recordFor(1900),2500)
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
        console.log('recordFor')
        const recording = new Audio.Recording()
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
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


        },400)

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
                <Button title="begin" onPress={this.start} />
                <Button title="STOP" onPress={this.stop} />
                <Text>Recording:  {this.state.recording.toString()}</Text>
                <Text>{this.state.errMessage}</Text>
                <ScrollView>
                {this.props.recordings.map( ({RecordingName,RecordingUri},key)=> <Row RecordingName={RecordingName} key={key} RecordingUri={RecordingUri} /> )}
                </ScrollView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    appContainer:
    {
        flex: 1,
    }
})

const mapStateToProps = (state) =>({
    recordings: state.recording,
    temp: state.tempRecording,
})

export default connect(mapStateToProps,{addRecording,removeRecording,addTempRecording,removeTempRecording,clearTemp},null)(App)