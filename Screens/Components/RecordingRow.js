import React from 'react'
import {StyleSheet,Text,View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Audio} from 'expo-av'

class App extends React.Component
{
    onClick = async () =>
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
    render()
    {
        return(
                <TouchableOpacity style={styles.appContainer} onPress={this.onClick} >
                        <Text>{this.props.RecordingName}</Text>
                        <Text>{this.props.RecordingUri}</Text>
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

export default App