import React from 'react'
import {View,StyleSheet,Text,ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
                <ScrollView>
                <Text style={styles.headingText}>About the app</Text>
                <Text style={styles.babyText}>So many interesting or weird things happen in our day to day lives but unfortunately we are not able record everything. Heard a good joke? Record it. Someone asked you for bribe? Record it. You just saw something weird happen? Record it.Found two terrorsits making plans? Record it. And so many more reasons to just record it even if you are not recording.</Text>
                <Text style={styles.headingText}> What does the app do?</Text>
                <Text style={styles.babyText}>This app practically is always recording, and always deleting the sound. When you hit record it starts recording and after sometime it starts deleting what was recorded. When you hit stop, it gives you latest recording of the time you selected.</Text>
                <Text style={styles.headingText}>What about my privacy?</Text>
                <Text style={styles.babyText}>Your privacy is secure with you and we don't share or listen the your recordings. Moreover even internet is not required to operate the app which means even if we wanted we couldn't hear your recordings.</Text>
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
        padding: 20,
        paddingTop: 0,
    },
    headingText:
    {
        fontSize: 30,
        paddingBottom: 10,
        color: 'white',

    },
    babyText:
    {
        fontSize: 15,
        paddingBottom: 20,
        color: 'white',
    }
})
export default App