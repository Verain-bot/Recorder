import React from 'react'
import {View,StyleSheet,Text,ScrollView,Linking} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
class Row extends React.Component
{
    render()
    {
        return(
            <View style={styles.bigView}>
                <View style={styles.smallView}><Text style={styles.babyText}>{this.props.left}</Text></View>
                <View style={styles.smallView}><Text style={styles.babyText}>{this.props.right}</Text></View>
            </View>
        )
    }
}

class App extends React.Component
{

    componentDidMount()
    {
        this.props.navigation.setOptions({
            headerLeft: ()=><Ionicons.Button name='chevron-back' 
            size={24} 
            backgroundColor="purple" 
            onPress={()=>this.props.navigation.goBack()}
            />,
        })
    }
    
    render()
    {
        return(
            <View style={styles.appContainer}>
            <ScrollView style={{flex: 1}}>
            <Row left="Developed By" right="Verain Sardana"/>
            <Row left="Version" right="1.0.0"/>
            <Row left="Date Started" right="7 August 2020"/>
            <Row left="Date Finished" right="15 September 2020"/>
            <Row left="Email" right="verainsardana@gmail.com"/>
            <Row left="App written using" right="React Native/JavaScript" />
            <View style={styles.bigView}>
                <View style={styles.smallView}><Text style={styles.babyText}>Source Code</Text></View>
                <View style={styles.smallView}>
                    <TouchableOpacity onPress={()=>Linking.openURL('https://github.com/Verain-bot/Recorder')}>
                    <Text style={styles.babyText}>Click Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{padding: 10,paddingBottom: 50, fontWeight: 'bold',color: 'white'}}>If you have any issues or are having any problems using this app, feel free to contact me.</Text>
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appContainer:
    {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#5a005a',
    },
    smallView:
    {
        flex: 1,
    },
    bigView:
    {
        flexDirection: 'row',
        padding: 5,
        flex: 1,
    },
    headingText:
    {
        fontSize: 30,
        padding: 10,
        alignSelf: 'center',
        color: 'white',
    },
    babyText:
    {
        fontSize: 15,
        marginRight: 10,
        color: 'white',
    }
})
export default App