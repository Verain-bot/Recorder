import React from 'react'
import {StyleSheet,View,Text,Switch,ScrollView} from 'react-native'
import Row,{CustomButton} from './Components/SettingsRow'
import Settings from './Components/Settings'
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
        Modal2Data: null,
        Modal3: false,
        sleepTime: {
            enable: false,
            from: new Date(),
            to: new Date(),
        },
        RecordingTime: {index: 0,val: 0},
        WaitTime: {index: 0,val: 0},
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

        let Modal2Data = [0,5,10,20,25,50,75,100,150,200,300,500]
        Modal2Data = Modal2Data.map((value)=>(value.toString()))
        this.setState({Modal2Data})

    }

    changeSleepTimeSwitch = ()=>
    {
        this.setState((prevState)=>({
            sleepTime: {...prevState, enable: !prevState.sleepTime.enable},
        }))
    }

    onSelectModal1 = (selectedItem)=>
    {
        this.setState({RecordingTime: {val: this.state.Modal1Data[selectedItem], index: selectedItem} })
    }


    onSelectModal2 = (selectedItem)=>
    {
        this.setState({WaitTime: {val: this.state.Modal2Data[selectedItem],index: selectedItem} })
    }

    onSelectModal3 = (selectedTime)=>
    {
        this.setState({sleepTime: {...this.state.sleepTime,from: selectedTime}})
    }

    onSelectModal4 = (selectedTime)=>
    {
        this.setState({sleepTime: {...this.state.sleepTime,to: selectedTime}})
    }

    render()
    {
        return(
            <ScrollView>
                <Row element={()=> <Switch value={this.state.High_Quality}  onValueChange={this.onValueChange} onTouchStart={this.onValueChange} />} 
                name='High Quality Recording'
                disabled={true}
                message={Settings.Recording_Quality.message}
                />

                <Row element={()=>(
                    <View>
                        <ModalScreen title="Recording Time" visible={this.state.Modal1} change={this.change1} component={()=> (
                            <WheelPicker data={this.state.Modal1Data} indicatorWidth={1}  onItemSelected={this.onSelectModal1} selectedItem={this.state.RecordingTime.index} />
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
                        <ModalScreen title="Wait Time" visible={this.state.Modal2} change={this.change2} component={()=> (
                            <WheelPicker data={this.state.Modal2Data} indicatorWidth={1}  onItemSelected={this.onSelectModal2} selectedItem={this.state.WaitTime.index} />
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
                        <ModalScreen title="Sleep Time" visible={this.state.Modal3} change={this.change3} component={()=> (
                            <View style={{flex: 1,alignItems: 'center',alignSelf: 'stretch'}}>
                                <Row name="Enable"
                                element={()=><Switch value={this.state.sleepTime.enable} onValueChange={this.changeSleepTimeSwitch} onTouchStart={this.changeSleepTimeSwitch} />}
                                message="Enable Sleep Time"
                                />
                                {this.state.sleepTime.enable?<View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                                    <Text style={{paddingTop: 0}}> From: </Text>
                                    <TimePicker onTimeSelected={this.onSelectModal3} initDate={this.state.sleepTime.from} />
                                    <Text style={{paddingTop: 0}}> To: </Text>
                                    <TimePicker onTimeSelected={this.onSelectModal4} initDate={this.state.sleepTime.to} />
                                </View>:<View />}
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
                <CustomButton title="Save Settings"  />
                <CustomButton title="Restore to defaults" />

                <Text>{this.state.High_Quality.toString()}</Text>
                <Text>{this.state.RecordingTime.val.toString()}</Text>
                <Text>{this.state.WaitTime.val.toString()}</Text>
                <Text>{this.state.sleepTime.to.toString()}</Text>
            </ScrollView>
        )
    }
}



export default App