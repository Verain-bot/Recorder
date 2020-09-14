import React from 'react'
import {View,Text,Button,StyleSheet} from 'react-native'
import List from './Components/RecordingListItem'
import {connect} from 'react-redux'
import {removeRecording} from '../redux'
import {TouchableOpacity} from 'react-native-gesture-handler'

class App extends React.Component
{
    
    render()
    {
        if(this.props.recordings.length>0)
        return(
            <View style={style.AppContainer}>
                {this.props.recordings.map((value,index)=>(
                    <List navigation={this.props.navigation} name={value.RecordingName} key={index} />
                ))}
            </View>
        )
        else
        return(
            <View style={style.AppContainer2}>
                <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center',textAlign: 'center'}} onPress={()=>this.props.navigation.navigate('Home')}>
                    <Text style={{color: 'white',padding: 10,paddingBottom:0}}>You don't have any recordings currently.</Text>
                    <Text style={{color: 'white',padding: 10,paddingBottom:20}}>Click here to record.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
AppContainer:{
    backgroundColor: '#5a005a',
    flex: 1,
},
AppContainer2:{
    backgroundColor: '#5a005a',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
})

const mapStateToProps = (state)=>({
    recordings: state.recording,
})

export default connect(mapStateToProps,{removeRecording},null)(App)