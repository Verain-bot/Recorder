import React from 'react'
import {StyleSheet,Text,View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Audio} from 'expo-av'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import {addRecording,removeRecording} from '../../redux'
import * as FileSystem from 'expo-file-system'

class App extends React.Component
{
    state = {
        URI: null,
    }

    onPlay = async () =>
    {
        try{
            console.log(this.props.RecordingUri)
            if(typeof this.props.RecordingUri === 'string')
            {
                this.playSound(this.props.RecordingUri)
            }
            else
            {
                const array = this.props.RecordingUri
                this.playSound(array[0],array.slice(1))
            }
        }
        catch(error)
        {
            alert(error.message)
        }
    }

    playSound = async (uri, next=[])=>
    {
        const sound = new Audio.Sound()
        await sound.loadAsync({uri: uri})
        await sound.playAsync()
        sound.setOnPlaybackStatusUpdate(async ({didJustFinish}) =>{
            if(didJustFinish)
            {
                sound.unloadAsync()
                if(next[0])
                {
                    this.playSound(next[0],next.slice(1))
                }
            }
        })
    }


    onRemove = async()=>
    {
        FileSystem.deleteAsync(this.props.RecordingUri)
        this.props.removeRecording(this.props.RecordingUri)
    }


    render()
    {
        return(
                <TouchableOpacity style={styles.appContainer}>
                        <Text>{this.props.RecordingName}</Text>
                        <Text>{typeof this.props.RecordingUri === "string"?this.props.RecordingUri:"Multi"}</Text>
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