import React from 'react'
import {View,StyleSheet,Text,Button,ScrollView} from 'react-native'
import {Audio} from 'expo-av'
import {store,addRecording,removeRecording,addTempRecording,removeTempRecording} from '../redux'
import {connect} from 'react-redux'
import Row from './Components/RecordingRow'
import * as FileSystem from 'expo-file-system'


class App extends React.Component
{
    state={
        errMessage: "",
        recording: false,
        totalTime: 4000,
    }

    checkPermission = async() =>
    {
        let x = await Audio.getPermissionsAsync()
        if(!x.granted)
            throw "ERROR"
    }

    start = async()=>
    {   
        this.setState({recording: true})
        this.recordFor(2000)

        /*this.interval = setInterval(async()=>{
            const y = await this.recordFor(2000)
            this.props.addRecording('TEMP',y)
        },2050)*/
    }

    stop = async()=>
    {
        this.setState({recording: false})
        //clearInterval(this.interval)
    }

    removeRecording = async(uri)=>
    {
        this.props.removeRecording(uri)
        await FileSystem.deleteAsync(uri)
    }

    recordFor = async(duration)=>
    {
        const recording = new Audio.Recording()
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
        await recording.startAsync()
        recording.setOnRecordingStatusUpdate(({durationMillis,canRecord})=>{
            if(canRecord && durationMillis>=duration)
            {
                recording.stopAndUnloadAsync()
                this.props.addRecording('TEMP',recording.getURI())
                if(this.state.recording)
                    setTimeout(()=>this.recordFor(duration),100)
                if(this.props.recordings.length*duration>this.state.totalTime){
                    this.removeRecording(this.props.recordings[0].RecordingUri)
                }
            }
        })
        return recording.getURI()
    }

    componentDidMount()
    {
        try{
            this.checkPermission()
        }
        catch(error){
            this.setState({errMessage: error.message})
        }
    }

    multiToOne = async()=>
    {
        this.props.addRecording("MULTIPLE",this.props.recordings)
    }
    
    render()
    {
        return(
            <View style={styles.appContainer} >
                <Button title="begin" onPress={this.start} />
                <Button title="STOP" onPress={this.stop} />
                <Button title="Multiple To One" onPress={this.multiToOne} />
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
})

export default connect(mapStateToProps,{addRecording,removeRecording,addTempRecording,removeTempRecording},null)(App)