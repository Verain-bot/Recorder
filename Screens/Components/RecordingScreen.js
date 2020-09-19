import React from 'react'
import {StyleSheet,Text,View,Dimensions, Alert, Button} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Audio} from 'expo-av'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {connect} from 'react-redux'
import {addRecording,removeRecording} from '../../redux'
import Slider from '@react-native-community/slider'


class App extends React.Component
{
    state = {
        playing: false,
        paused: false,
        mute: false,
        Recording: this.props.recordings.find((value)=> value.RecordingName ===  this.props.route.params.name ),
        canPlayAgain: true,
        currentDuration: 0,
        adder: 0,
        maxDuration: 192,
        currentSound: null,
        stop: false,
        enabled: true,
    }

    onPlay = async () =>
    {
        this.enableAfter()
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

    playSound = async(uri,next=[])=>
    {
        const sound = new Audio.Sound()
        await sound.loadAsync({uri: uri})
        this.changeAdder(uri)
        this.setState({
            currentSound: sound,
        })
        await sound.playAsync()

        this.interval = setInterval(async ()=>{
            let status = await sound.getStatusAsync()
            
            if(typeof status.positionMillis === 'number')
                this.setState({
                    currentDuration: parseInt(this.state.adder*status.durationMillis/1000 + status.positionMillis/1000),
                })
            if(status.positionMillis === status.durationMillis)
            {
                await sound.unloadAsync()
                clearInterval(this.interval)
                if(next[0])
                    await this.playSound(next[0],next.slice(1))
                else
                    this.setState({
                        playing: false,
                        canPlayAgain: true,
                    })
            }

        },100)
    }

    

    test = ()=>
    {
        //play/pause
        this.enableAfter()
        if(this.state.canPlayAgain)
        {
            this.onPlay()
            this.setState((prevState)=>({
                canPlayAgain: !prevState.canPlayAgain,
            }))
        }
        else if(this.state.playing)
        {
            this.state.currentSound.pauseAsync()
        }
        else if(!this.state.playing)
        {
            this.state.currentSound.playAsync()
        }
        this.setState((prevState)=>({
            playing: !prevState.playing,
        }))
    }

    test2 = ()=>{
        //mute
        this.enableAfter()
        this.setState((prevState)=>({
            mute: !prevState.mute,
        }))
        this.state.currentSound.setIsMutedAsync(!this.state.mute)
    }

    forward =  async ()=>{
        this.enableAfter()
        let x = this.state.currentSound
        const array = this.state.Recording.RecordingUri
        x = await x.getStatusAsync()
        x = 'file://'+x.uri

        await this.state.currentSound.stopAsync()
        await this.state.currentSound.unloadAsync()
        clearInterval(this.interval)
        let y = array.indexOf(x)
        this.setState({
            playing: true,
            canPlayAgain: false,
        })
        this.playSound(array[y+1],array.slice(y+2))
        
        
    }

    backward = async()=> {
        this.enableAfter()
        let x = this.state.currentSound
        const array = this.state.Recording.RecordingUri
        x = await x.getStatusAsync()
        x = 'file://'+x.uri

        await this.state.currentSound.stopAsync()
        await this.state.currentSound.unloadAsync()
        clearInterval(this.interval)
        let y = array.indexOf(x)
        this.setState({
            playing: true,
            canPlayAgain: false,
        })
        this.playSound(array[y-1],array.slice(y))
    }

    stop =async ()=>{
        this.enableAfter()
        this.setState({
            canPlayAgain: true,
            playing: false,
            currentDuration: 0,
            
        })
        await this.state.currentSound.stopAsync()
        await this.state.currentSound.unloadAsync()
        clearInterval(this.interval)
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

    enableAfter = ()=>{
        this.setState({
            enabled: false,
        })

        setTimeout(()=>{
            this.setState({
                enabled: true,
            })
        },500)
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
                    <TouchableOpacity onPress={this.backward} disabled={this.state.enabled} >
                        <Ionicons.Button name='play-back-outline' backgroundColor='' size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.test} disabled={this.state.enabled} >
                        <Ionicons.Button name={this.state.playing?'pause-outline':'play-outline'} backgroundColor='' size={40} />
                    </TouchableOpacity>

                    {!this.state.canPlayAgain?<TouchableOpacity onPress={this.stop} disabled={this.state.enabled} >
                        <Ionicons.Button name={'stop-outline'} backgroundColor='' size={40} />
                    </TouchableOpacity>:<View />}

                    <TouchableOpacity onPress={this.forward} disabled={this.state.enabled} >
                        <Ionicons.Button name='play-forward-outline' backgroundColor='' size={25} />
                    </TouchableOpacity>
                </View>

                    <TouchableOpacity style={{alignSelf: 'flex-start',backgroundColor: ''}} onPress={this.test2} disabled={this.state.enabled} >
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