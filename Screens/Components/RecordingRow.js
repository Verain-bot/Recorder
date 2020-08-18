import React from 'react'
import {StyleSheet,Text,View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Audio} from 'expo-av'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import {store,addRecording,removeRecording} from '../../redux'
import * as FileSystem from 'expo-file-system'

class App extends React.Component
{
    onPlay = async () =>
    {
        try{
            const sound = new Audio.Sound()
            await sound.loadAsync({uri: this.props.RecordingUri})
            await sound.playAsync()
        }
        catch(error)
        {
            alert(error.message)
        }
    }

    onRemove = async()=>
    {
        FileSystem.deleteAsync(this.props.RecordingUri)
        this.props.removeRecording(this.props.RecordingUri)
    }

    onAdd = async()=>
    {
        try{
            let download = await FileSystem.moveAsync({from:this.props.RecordingUri,to:FileSystem.documentDirectory+"Verain.m4a"})
            console.log(download)
            this.props.addRecording('Downloaded',FileSystem.documentDirectory+"Verain.m4a")
            this.onRemove()
        }
        catch(error)
        {
            alert(error.message)
        }
    }
    render()
    {
        return(
                <TouchableOpacity style={styles.appContainer}>
                        <Text>{this.props.RecordingName}</Text>
                        <Text>{this.props.RecordingUri}</Text>
                        <Ionicons.Button name="add" size={24} onPress={this.onAdd} />
                        <Ionicons.Button name="remove" size={24} onPress={this.onRemove} />
                        <Ionicons.Button name="play" size={24} onPress={this.onPlay} />
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    appContainer:
    {
        padding: 20,
        borderBottomWidth: 1,
    },
})

const mapStateToProps = (state)=>
({
    recordings: state.recording,
})

export default connect(mapStateToProps,{addRecording,removeRecording},null)(App)