import React from 'react'
import {StyleSheet,Text,View,Dimensions} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Audio} from 'expo-av'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {connect} from 'react-redux'
import {addRecording,removeRecording} from '../../redux'
import * as FileSystem from 'expo-file-system'
import Slider from '@react-native-community/slider'


class App extends React.Component
{
    state = {
        playing: false,
        mute: false,
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

    test = ()=>
    {
        this.setState((prevState)=>({
            playing: !prevState.playing,
        }))
    }

    test2 = ()=>{
        this.setState((prevState)=>({
            mute: !prevState.mute,
        }))
    }
    render()
    {
        return(
            <View style={styles.appContainer} >
                <Text style={styles.Heading}>Recording 1</Text>
                <Text style={styles.SemiHeaderText}>Wednesday 29 August 5:00 PM</Text>
                <View style={{padding: 10, borderColor: 'white',borderWidth: 2,margin: 5,borderRadius: 20,paddingTop: 20,paddingBottom: 0}}>
                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',flexDirection: 'row',padding:5,paddingBottom:0}}>
                <Text style={{color: 'white'}}>0:00</Text>
                <Slider style={styles.Slider} 
                minimumTrackTintColor={'white'}
                maximumTrackTintColor={'white'} 
                thumbTintColor={"white"}
                 />
                 <Text style={{color: 'white'}}>1:00</Text>
                 </View>
                
                <View style={styles.nav}>

                <View style={{flexDirection: 'row',alignItems: 'center',flex: 1,justifyContent: 'center',paddingLeft: 50}}>
                    <TouchableOpacity>
                        <Ionicons.Button name='play-back-outline' backgroundColor='' size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.test} >
                        <Ionicons.Button name={this.state.playing?'pause-outline':'play-outline'} backgroundColor='' size={40} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons.Button name='play-forward-outline' backgroundColor='' size={25} />
                    </TouchableOpacity>
                </View>

                    <TouchableOpacity style={{alignSelf: 'flex-start',backgroundColor: ''}} onPress={this.test2}>
                        <Ionicons.Button name={this.state.mute?'volume-mute-outline':'volume-high-outline'} backgroundColor='' size={25} />
                    </TouchableOpacity>
                </View>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    appContainer:{
        flex: 1,
        alignItems: 'center',
        
    },
    Slider:{
        width: '85%',
    },
    nav:{
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10,
        margin: 5,
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Heading:
    {
        color: 'white',
        alignSelf: 'flex-start',
        padding: 20,
        fontSize: 30,
        paddingBottom: 4,
        fontWeight: 'bold',
    },
    SemiHeaderText:
    {
        color: '#FFFFFF',
        alignSelf: 'flex-start',
        marginBottom: 100,
        paddingLeft: 20,
    },
})

const mapStateToProps = (state)=>
({
    recordings: state.recording,
})

export default connect(mapStateToProps,{addRecording,removeRecording},null)(App)