import React from 'react'
import {View,Text,Button,StyleSheet} from 'react-native'
import List from './Components/RecordingListItem'
import {connect} from 'react-redux'
import {removeRecording} from '../redux'

class App extends React.Component
{

    render()
    {
        return(
            <View style={style.AppContainer}>
                {this.props.recordings.map((value,index)=>(
                    <List navigation={this.props.navigation} name={value.RecordingName} key={index} />
                ))}
            </View>
        )
    }
}

const style = StyleSheet.create({
AppContainer:{
    backgroundColor: '#5a005a',
    flex: 1,
},
})

const mapStateToProps = (state)=>({
    recordings: state.recording,
})

export default connect(mapStateToProps,{removeRecording},null)(App)