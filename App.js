import React from 'react';
import {StyleSheet,View, Text,Button} from 'react-native';
import Screen1 from './Screens/Screen1'
import Screen2 from './Screens/Screen2'
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import {Provider} from 'react-redux'
import {store,persistor} from './redux'
import { PersistGate } from 'redux-persist/integration/react'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const x = ({navigation}) => (
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor} >
    <Stack.Navigator
    screenOptions={{headerLeft: () => <Ionicons.Button name='ios-menu' 
      size={24} 
      backgroundColor="purple" 
      onPress={navigation.openDrawer}
      />,
    headerTitleAlign: 'center',
    headerStyle: {backgroundColor: 'purple'},
    headerTitleStyle: {color: 'white'},
    }}
    headerMode="float"
    >
      <Stack.Screen name="Home" component={Screen1} />
    </Stack.Navigator>
    </PersistGate>
    </Provider>
)

const y = ({navigation}) => (
  <Stack.Navigator
  screenOptions={{headerLeft: () => <Ionicons.Button name='ios-menu' 
    size={24} 
    backgroundColor="purple" 
    onPress={navigation.openDrawer}
    />,
  headerTitleAlign: 'center',
  headerStyle: {backgroundColor: 'purple'},
  headerTitleStyle: {color: 'white'},
  }}
  headerMode="float"
  >
      <Stack.Screen name="About Us" component={Screen2} />
    </Stack.Navigator>
)

class App extends React.Component
{
  render()
  {
    return(
    <View style={{flex: 1}}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"  
      drawerType="swipe" 
      drawerContentOptions={{
        activeTintColor: 'white',
        style: styles.List,
        inactiveTintColor: 'white',
      }}
      >

        <Drawer.Screen name="Home" 
        component={x}  
        options={{drawerIcon: ({focused, color, size})=> (<Ionicons color={color} size={size} name={focused? 'home':'home-outline'} />)}} 
        />

        <Drawer.Screen name="About Us" 
        component={y}
        options={{drawerIcon: ({focused, color, size})=> (<Ionicons color={color} size={size} name={focused? 'at-circle':'at-sharp'} />)}} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
    </View>
    )
  }
}

const styles =StyleSheet.create({
  List:{
    backgroundColor: 'purple',
  },
})

export default App