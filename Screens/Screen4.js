import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import List from './Components/RecordingListItem'

class App extends React.Component
{
    render()
    {
        return(
            <View style={style.AppContainer}>
                <List />
                <List />
                <List />
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

export default App