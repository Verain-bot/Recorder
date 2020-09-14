import React from 'react'
import {StyleSheet,View,Text,Switch,ScrollView} from 'react-native'
import Row,{CustomButton} from './Components/SettingsRow'
import Settings from './Components/Settings'
import ModalScreen from './Components/Modal'
import Ionicons from 'react-native-vector-icons/AntDesign'
import {WheelPicker,TimePicker} from 'react-native-wheel-picker-android'
import {changeSetting,changeToDefault} from '../redux'
import {connect} from 'react-redux'

class App extends React.Component
{
    state = {
        High_Quality: this.props.settings.Recording_Quality.currentValue,
        Modal1: false,
        Modal1Data: null,
        Modal2: false,
        Modal2Data: null,
        Modal3: false,
        sleepTime: this.props.settings.Sleep_Time.currentValue,
        RecordingTime: {index: 0,val: this.props.settings.Recording_Time.currentValue},
        WaitTime: {index: 0,val: this.props.settings.Wait_time.currentValue},
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

    timeString = ()=>
    {
        try{
            if (!this.state.sleepTime.enable)
                return 'Off'
            const time = `${this.state.sleepTime.from.toLocaleTimeString().substr(0,5)} - ${this.state.sleepTime.to.toLocaleTimeString().substr(0,5)}`
            return time
        }
        catch(err)
        {
            return ''
        }

    }

    onSave = ()=>
    {
        this.props.changeSetting('Recording_Quality',this.state.High_Quality)
        this.props.changeSetting('Recording_Time',this.state.RecordingTime.val)
        this.props.changeSetting('Wait_time',this.state.WaitTime.val)
        this.props.changeSetting('Sleep_Time',this.state.sleepTime)
        console.log(this.props.settings)
    }

    onDefault = () =>
    {
        this.props.changeToDefault()
    }

    render()
    {
        return(
            <View style={styles.AppContainer} >
            <ScrollView>
                <Row element={()=> <Switch value={this.state.High_Quality} onTouchStart={this.onValueChange} />} 
                name='High Quality Recording'
                disabled={true}
                message={Settings.Recording_Quality.message}
                state={this.state.High_Quality?"On":"Off"}
                />

                <Row element={()=>(
                    <View>
                        <ModalScreen title="Recording Time" visible={this.state.Modal1} change={this.change1} component={()=> (
                            <WheelPicker data={this.state.Modal1Data} indicatorWidth={1}  onItemSelected={this.onSelectModal1} selectedItem={this.state.RecordingTime.index} selectedItemTextColor="white" indicatorColor="white" />
                        ) } />
                        <Ionicons.Button name="right" color="#979695" backgroundColor="" />
                    </View>
                )}
                name="Recording Time"
                disabled={false}
                onPress={this.change1}
                message={Settings.Recording_Time.message}
                state={this.state.RecordingTime.val+" mins"}
                />

                <Row element={()=>(
                    <View>
                        <ModalScreen title="Wait Time" visible={this.state.Modal2} change={this.change2} component={()=> (
                            <WheelPicker data={this.state.Modal2Data} indicatorWidth={1}  onItemSelected={this.onSelectModal2} selectedItem={this.state.WaitTime.index} selectedItemTextColor="white" indicatorColor="white"/>
                        ) } />
                        <Ionicons.Button name="right" color="#979695" backgroundColor="" />
                    </View>
                )}
                name="Wait Time"
                disabled={false}
                onPress={this.change2}
                message={Settings.Wait_time.message}
                state={this.state.WaitTime.val+" ms"}
                />
                
                <Row element={()=>(
                    <View>
                        <ModalScreen title="Sleep Time" visible={this.state.Modal3} change={this.change3} component={()=> (
                            <View style={{flex: 1,alignItems: 'center',alignSelf: 'stretch'}}>
                                <Row name="Enable"
                                element={()=><Switch value={this.state.sleepTime.enable}  onTouchStart={this.changeSleepTimeSwitch} />}
                                message="Enable Sleep Time"
                                />
                                {this.state.sleepTime.enable?<View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                                    <Text style={{paddingTop: 0}}> From: </Text>
                                    <TimePicker onTimeSelected={this.onSelectModal3} initDate={this.state.sleepTime.from} selectedItemTextColor="white" indicatorColor="white"/>
                                    <Text style={{paddingTop: 0}}> To: </Text>
                                    <TimePicker onTimeSelected={this.onSelectModal4} initDate={this.state.sleepTime.to} selectedItemTextColor="white" indicatorColor="white" />
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
                state={this.timeString()}
                />
                <View style={{height: 50}} />
                
                <CustomButton title="Save Settings"  onPress={this.onSave} />
                <CustomButton title="Restore to defaults" onPress={this.onDefault} />
                
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    AppContainer:{
        backgroundColor: '#5a005a',
        flex: 1,
    },
})

const mapStateToProps = (state)=>({
    settings: state.settings,
})

export default connect(mapStateToProps,{changeSetting,changeToDefault},null)(App)