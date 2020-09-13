import React from 'react'
import {StyleSheet,Text,View,Dimensions, Alert} from 'react-native'
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
        Recording: this.props.recordings.find((value)=> value.RecordingName ===  this.props.route.params.name ),
        canPlayAgain: true,
        currentDuration: 0,
        adder: 0,
        maxDuration: 192,
        forward: false,
        backward: false,
    }

    onPlay = async () =>
    {
        try{
            
            if(typeof this.state.Recording.RecordingUri === 'string')
            {
                this.playSound(this.state.Recording.RecordingUri)
            }
            else
            {
                const array = this.state.Recording.RecordingUri
                this.playSound(array[0],array.slice(1))
            }
        }
        catch(error)
        {
            alert(error.message)
        }
    }

    changeAdder= (uri)=>
    {
        let x = this.state.Recording.RecordingUri.indexOf(uri)
        this.setState({
            adder: x,
        })
    }

    playSound = async (uri, next=[])=>
    {
        const sound = new Audio.Sound()
        await sound.loadAsync({uri: uri})
        this.changeAdder(uri)
        await sound.playAsync()
        sound.setOnPlaybackStatusUpdate(async ({isPlaying,isLoaded,didJustFinish,positionMillis,playableDurationMillis}) =>{

            if(!didJustFinish &&this.state.backward)
            {
                try{
                await sound.stopAsync()
                await sound.unloadAsync()
                let x = this.state.Recording.RecordingUri.indexOf(uri)
                x = x>0?x:1
                await this.playSound(this.state.Recording.RecordingUri[x-1],this.state.Recording.RecordingUri.slice(x))
                console.log(x)


                this.setState({
                    backward: false,
                })
                }
                catch(error)
                {
                    alert(error.message)
                }
            }

            if( !didJustFinish &&isLoaded)
            {
                await sound.setIsMutedAsync(this.state.mute)
                if(!this.state.playing)
                    await sound.pauseAsync()
            }
            
            
            if(didJustFinish&&isLoaded)
            {
                await sound.unloadAsync()
                if(next[0])
                {
                    await this.playSound(next[0],next.slice(1))
                }
                else{
                    this.setState({playing: false,canPlayAgain: true})
                }
            }

            if(!isPlaying&&isLoaded&&!didJustFinish)
            {
                this.interval = setInterval(async()=>{
                    if(this.state.playing)
                    {
                        await sound.playAsync()
                        clearInterval(this.interval)
                    }
                } ,500)
            }

            if(typeof positionMillis === 'number')
                this.setState({
                    currentDuration: parseInt((this.state.adder*playableDurationMillis + positionMillis)/1000),
                })
            


            if(this.state.forward)
            {
                await sound.stopAsync()
                await sound.unloadAsync()
                await this.playSound(next[0],next.slice(1))
                this.setState({
                    forward: false,
                })   
            }

        
        })
    }

    test = ()=>
    {
        this.setState((prevState)=>({
            playing: !prevState.playing,
            canPlayAgain: false,
        }))
        if(this.state.canPlayAgain)
            this.onPlay()
    }

    test2 = ()=>{
        this.setState((prevState)=>({
            mute: !prevState.mute,
        }))
    }

    forward = ()=>{
        this.setState({
            forward: true,
        })
    }

    backward = ()=> {
        this.setState({
            backward: true,
        })
    }

    init = async()=>
    {
        this.props.navigation.setOptions({
            title: this.props.route.params.name,
            headerLeft: ()=><Ionicons.Button name='chevron-back' 
            size={24} 
            backgroundColor="purple" 
            onPress={()=>this.props.navigation.goBack()}
            />,
        })
        

        let x = new Audio.Sound()
        await x.loadAsync({uri: this.state.Recording.RecordingUri[0]})
        let y = await x.getStatusAsync()
        await x.unloadAsync()
        y = y.playableDurationMillis/1000
        let size = this.state.Recording.RecordingUri.length
        this.setState({
            maxDuration: y*size,
        })
    }

    componentDidMount()
    {
        this.init()
        
    }
    render()
    {
        return(
            <View style={styles.appContainer} >
                <Text style={styles.Heading}>{this.props.route.params.name}</Text>
                <View style={{padding: 10, borderColor: 'white',borderWidth: 2,margin: 5,borderRadius: 20,paddingTop: 20,paddingBottom: 0}}>
                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',flexDirection: 'row',padding:5,paddingBottom:0}}>
                <Text style={{color: 'white'}}>{parseInt(this.state.currentDuration/60).toString()+':'+parseInt(this.state.currentDuration%60).toString()}</Text>

                <Slider style={styles.Slider} 
                minimumTrackTintColor={'white'}
                maximumTrackTintColor={'white'} 
                thumbTintColor={"white"}
                maximumValue={parseInt(this.state.maxDuration)}
                minimumValue={0}
                value={this.state.currentDuration}
                onTouchStart={()=> Alert.alert("Don't move",'Currently changing time on recording is not supported and the slider is there only for visuals, kindly don\'t change it, nothing will happen.(Use buttons to change time)')}
                />

                <Text style={{color: 'white'}}>{parseInt(this.state.maxDuration/60).toString()+':'+parseInt(this.state.maxDuration%60).toString()}</Text>

                 </View>
                
                <View style={styles.nav}>

                <View style={{flexDirection: 'row',alignItems: 'center',flex: 1,justifyContent: 'center',paddingLeft: 50}}>
                    <TouchableOpacity onPress={this.backward} >
                        <Ionicons.Button name='play-back-outline' backgroundColor='' size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.test} >
                        <Ionicons.Button name={this.state.playing?'pause-outline':'play-outline'} backgroundColor='' size={40} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.forward} >
                        <Ionicons.Button name='play-forward-outline' backgroundColor='' size={25} />
                    </TouchableOpacity>
                </View>

                    <TouchableOpacity style={{alignSelf: 'flex-start',backgroundColor: ''}} onPress={this.test2}>
                        <Ionicons.Button name={this.state.mute?'volume-mute-outline':'volume-high-outline'} backgroundColor='' size={25} />
                    </TouchableOpacity>
                </View>
                </View>
            <Text>{this.state.backward.toString()}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    appContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#5a005a',
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
        marginBottom: 100,
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