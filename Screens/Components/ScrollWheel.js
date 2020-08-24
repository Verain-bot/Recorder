import React from 'react'
import {View,Text,Button} from 'react-native'
import {WheelPicker} from 'react-native-wheel-picker-android'

class App extends React.Component
{
    state={
        si: 0,
    }
    
    render()
    {
        return(
            <WheelPicker data={['1','2','4']} indicatorWidth={1} />
        )
    }
}

export default App