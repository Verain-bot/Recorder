import React from 'react'
import {Modal,View,StyleSheet,Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class App extends React.Component
{

    render()
    {
        return(
            <Modal 
            animationType="slide"
            transparent={true}
            visible={this.props.visible}
            >
                <View style={styles.modalView}>
                    <View style={styles.topModalView}>
                            <View style={{flex: 1,alignItems: 'center'}}>
                                <Text style={{color: 'white',fontWeight: 'bold'}} >{this.props.title}</Text>
                            </View>
                            <View>
                            <Ionicons.Button name="close" style={{marginLeft: 0}} backgroundColor="" onPress={this.props.change} />
                            </View>
                    </View>
                    <View style={styles.mainModalView} >
                        {this.props.component()}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalView:{
        backgroundColor: 'purple',
        flex: 1,
        margin: 20,
        marginTop: 100,
        elevation: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#979695'
    },
    topModalView:
    {
        alignSelf: 'stretch',
        margin: 0,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#979695',
    },
    mainModalView:
    {
        backgroundColor: '#5a005a',
        flex: 1,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    })

    export default App