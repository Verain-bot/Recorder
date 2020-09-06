import React from 'react'
import {StyleSheet,Text,View,Animated} from 'react-native'
import {TouchableOpacity,RectButton} from 'react-native-gesture-handler'
import Icons from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { color } from 'react-native-reanimated'

class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.r = React.createRef()
    }

    state = 
    {
        x: true,
    }
    dum = ()=>
    {
        this.setState((prevState)=>({
            x: !prevState.x,
        }))
    }
    close = ()=>
    {
        this.r.current.close()
    }
    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });

        const t2 = dragX.interpolate({
            inputRange: [0,50,100,200],
            outputRange: [0,0,1,1],
        })

        return (
          
            <Animated.View
              style={[
                styles.List,
                {
                  transform: [{ translateX: trans }],
                  padding: 0,
                  opacity: t2,
                  backgroundColor: 'white',
                },
              ]}>
            <TouchableOpacity style={{flex: 1,padding:10, alignItems: 'center', justifyContent: 'center'}} onPress={this.close}>
                <Text style={[styles.ListText,{color: '#5a005a',fontWeight: 'bold'}]}>Delete</Text>
            </TouchableOpacity>
            </Animated.View>
          
        );
      };

    render()
    {
        return(
            
            <Swipeable renderLeftActions={this.renderLeftActions}  ref={this.r} friction={2} >
            <TouchableOpacity onPress={this.dum}>
                <View style={styles.List}>
                <Text style={styles.ListText}>
                    Recording 1a
                </Text>
                
                <View style={styles.List2}>
                <Icons.Button name="right" backgroundColor='' />
                </View>

                </View>
            </TouchableOpacity>
            </Swipeable>
        )
    }
}

const styles = StyleSheet.create({

    List:
    {
        backgroundColor:'#5a005a',
        padding: 15,
        flexDirection: 'row',
        margin: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
    },
    List2:
    {
        alignSelf: 'center',
        position: 'absolute',
        right: 0,
        paddingRight: 20,
    },
    ListText:{
        color: 'white',
        fontSize: 18,
    },
    leftAction:{
        borderColor: 'white',
        borderWidth: 2,
    },
    actionText:{
        color: 'white',
    }
})

export default App