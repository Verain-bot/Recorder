import React from 'react'
import {View,StyleSheet,Text,Button,ScrollView} from 'react-native'
import {Audio} from 'expo-av'
import {store,addRecording,removeRecording} from '../redux'
import {connect} from 'react-redux'
import Row from './Components/RecordingRow'


class App extends React.Component
{
    state={
        errMessage: "",
        recording: false,
        number: 0,
    }

    checkPermission = async() =>
    {
        let x = await Audio.getPermissionsAsync()
        if(!x.granted)
            throw "ERROR"
    }

    stop = async()=>
    {
        let z= await this.recording.stopAndUnloadAsync()
        console.log(z)
        let as = await this.recording.createNewLoadedSoundAsync({shouldPlay: true,isLooping:false},null)
        console.log(as)
        await as.sound.playAsync()
        z = await this.recording.getStatusAsync()
        this.setState({status: z.isRecording})
    }


    record = async () =>
    {
        try
        {   
            if(!this.state.recording)
            {
                const recording = new Audio.Recording()
                let y = await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
                console.log(y)

                y = await recording.startAsync()
                console.log(y)

                y = await recording.getStatusAsync()
                console.log(y)

                const fun = async() =>
                {
                    await recording.stopAndUnloadAsync()
                    let asd = await recording.getStatusAsync()
                    console.log(asd)
                    let uri = recording.getURI()
                    this.props.addRecording("VERAIN",uri)
                    
                }

                setTimeout(fun,5000)
                y = await recording.getStatusAsync()
                console.log(y)
            }
            else
            {
                let z= await recording.stopAndUnloadAsync()
                console.log(z)
            }
        }

        catch(error)
        {
            this.setState({errMessage: error.message})
        }
        
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
                <Button title="begin" onPress={this.record} />
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

export default connect(mapStateToProps,{addRecording,removeRecording},null)(App)