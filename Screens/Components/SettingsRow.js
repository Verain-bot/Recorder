import React from 'react'
import {Text,StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

export class CustomButton extends React.Component
{
    render()
    {
        return(
            <TouchableOpacity style={styles.button} onPress={this.props.onPress} >
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}


class App extends React.Component
{
    render()
    {
        return(
            <View style={styles.mainView} >
                <TouchableOpacity style={styles.appContainer} disabled={this.props.disabled} onPress={this.props.onPress}>
                    <View style={styles.left}>
                        <Text style={{fontSize: 16,color: 'white',fontWeight: 'bold',}}>{this.props.name}</Text>
                        {typeof this.props.state==='string'?<Text style={{fontSize: 12,color: 'white'}}>{this.props.state}</Text>:<Text/>}
                    </View>
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
        borderColor: 'white',
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
        color: 'white',
        padding: 8,
    },
    button:
    {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 2,
        margin: 15,
        borderRadius: 30,
    },
    buttonText:
    {
        color: 'white',
        fontWeight: 'bold',
    }
})

export default App