import React from 'react'
import {Text,StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/AntDesign'
//<Ionicons.Button name="right" color="#979695" backgroundColor="" />
class App extends React.Component
{
    render()
    {
        return(
            <View style={styles.mainView} >
                <TouchableOpacity style={styles.appContainer} disabled={this.props.disabled} onPress={this.props.onPress}>
                    <View style={styles.left}><Text>{this.props.name}</Text></View>
                    <View style={styles.right}>
                        {this.props.element()}
                    </View>
                </TouchableOpacity>
                    <Text style={styles.bottomText}>{this.props.message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appContainer:
    {
        flexDirection: 'row',
        padding: 14,
        alignItems: 'stretch',
    },
    mainView:{
        borderBottomWidth: 2,
        borderColor: '#979695',
        alignSelf:'stretch',
    },
    right:{
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
    },
    left:{
        flex: 4,
        justifyContent: 'center',
    },
    bottomText:{
        color: '#979695',
        padding: 8,
    },
})

export default App