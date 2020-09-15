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
import Screen3 from './Screens/Screen3'
import Screen4 from './Screens/Screen4'
import RecordingScreen from './Screens/Components/RecordingScreen'
import AboutScreen1 from './Screens/Components/AboutScreen1'
import AboutScreen2 from './Screens/Components/AboutScreen2'


const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const recordings = ({navigation}) => (
  <Provider store={store}>
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
    initialRouteName="Recordings"
    >
      <Stack.Screen name="Recordings" component={Screen4} />
      <Stack.Screen name='Recording' component={RecordingScreen} />
    </Stack.Navigator>
    </Provider>
)


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
      <Stack.Screen name="About the developer" component={AboutScreen1} />
      <Stack.Screen name="About the app" component={AboutScreen2} />
    </Stack.Navigator>
)

const z = ({navigation}) => (
  <Provider store={store}>
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
      <Stack.Screen name="Settings" component={Screen3} />
    </Stack.Navigator>
  </PersistGate>
  </Provider>
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

        <Drawer.Screen name="Settings"  
        component={z}
        options={{drawerIcon: ({focused, color, size})=> (<Ionicons color={color} size={size} name={focused? 'ios-settings':'ios-settings-outline'} />)}} 
        />

        <Drawer.Screen name='Recordings'
        component={recordings}
        options={{drawerIcon: ({focused, color, size})=> (<Ionicons color={color} size={size} name={focused? 'ios-recording':'ios-recording-outline'} />)}} 
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