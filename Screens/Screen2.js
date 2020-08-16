import React from 'react'
import {View,StyleSheet,Text,ScrollView} from 'react-native'

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
    render()
    {
        return(
            <View style={styles.appContainer}>
            <ScrollView style={{flex: 1}}>
            <Row left="Developed By" right="Verain Sardana"/>
            <Row left="Version" right="1.0.0"/>
            <Row left="Date Started" right="7 August 2020"/>
            <Row left="About the App" right="So many interesting or weird things happen in our day to day lives but unfortunately we are not able record everything. Heard a good joke? Record it. Someone asked you for bribe? Record it. You just saw something weird happen? Record it.Found two terrorsits making plans? Record it. And so many more reasons to just record it even if you are not recording." />
            <Text style={styles.headingText}>About The Developer</Text>
            <Row left="Date of birth" right="14 June 2001"/>
            <Row left="Place of birth" right="Hisar, Haryana, India"/>
            <Row left="Email" right="verainsardana@gmail.com"/>
            <Row left="App written using" right="React Native/JavaScript" />
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