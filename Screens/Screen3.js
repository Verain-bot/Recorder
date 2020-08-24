import React from 'react'
import {StyleSheet,View,Text,Button,Switch,Modal} from 'react-native'
import Row from './Components/SettingsRow'
import Settings from './Components/Settings'
import Wheel from './Components/ScrollWheel'
import ModalScreen from './Components/Modal'
import Ionicons from 'react-native-vector-icons/AntDesign'
import {WheelPicker,TimePicker} from 'react-native-wheel-picker-android'

class App extends React.Component
{
    state = {
        High_Quality: true,
        Modal1: false,
        Modal1Data: null,
        Modal2: false,
        Modal3: false,
    }
    onValueChange = ()=>{
        this.setState((prevState)=>({
            High_Quality: !prevState.High_Quality,
        }))
    }
    change = (name)=>(()=>
    {
        this.setState(prevState=>({
            [name]: !prevState[name],
        }))
    })
    change1 = this.change('Modal1')
    change2 = this.change('Modal2')
    change3 = this.change('Modal3')

    componentDidMount()
    {
        const Modal1Data = new Array(7)
        for(var i=0;i<5;i++)
        {
            Modal1Data[i] = (i+1).toString()
        }
        Modal1Data[5]='10'
        Modal1Data[6]='15'
        this.setState({Modal1Data: Modal1Data})
    }

    render()
    {
        return(
            <View>
                <Row element={()=> <Switch value={this.state.High_Quality}  onValueChange={this.onValueChange}/>} 
                name='High Quality Recording'
                disabled={true}
                message={Settings.Recording_Quality.message}
                />

                <Row element={()=>(
                    <View>
                        <ModalScreen title="Verain" visible={this.state.Modal1} change={this.change1} component={()=> (
                            <WheelPicker data={this.state.Modal1Data} indicatorWidth={1} initPosition={2} />
                        ) } />
                        <Ionicons.Button name="right" color="#979695" backgroundColor="" />
                    </View>
                )}
                name="Recording Time"
                disabled={false}
                onPress={this.change1}
                message={Settings.Recording_Time.message}
                />

                <Row element={()=>(
                    <View>
                        <ModalScreen title="Verain" visible={this.state.Modal2} change={this.change2} component={()=> (
                            <WheelPicker data={this.state.Modal1Data} indicatorWidth={1} initPosition={2} />
                        ) } />
                        <Ionicons.Button name="right" color="#979695" backgroundColor="" />
                    </View>
                )}
                name="Wait Time"
                disabled={false}
                onPress={this.change2}
                message={Settings.Wait_time.message}
                />
                
                <Row element={()=>(
                    <View>
                        <ModalScreen title="Verain" visible={this.state.Modal3} change={this.change3} component={()=> (
                            <View style={{flex: 1,alignItems: 'stretch',justifyContent: 'center',flexDirection:'column'}}>
                            <Row name="Enable" element={()=> <Switch />} />
                            <Text> From: </Text>
                            <TimePicker />
                            <Text style={{paddingTop: 0}}> To: </Text>
                            <TimePicker />
                            </View>
                        ) } />
                        <Ionicons.Button name="right" color="#979695" backgroundColor="" />
                    </View>
                )}
                name="Sleep Time"
                disabled={false}
                onPress={this.change3}
                message={Settings.Sleep_Time.message}
                />
            </View>
        )
    }
}



export default App