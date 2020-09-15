import React from 'react'
import {View,StyleSheet} from 'react-native'
import {ListItem} from './Components/RecordingListItem'
class App extends React.Component
{
    render()
    {
        return(
            <View style={styles.appContainer}>
                <ListItem name='About the developer' navigation={this.props.navigation} />
                <ListItem name='About the app' navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appContainer:
    {
        flex: 1,
        backgroundColor: '#5a005a',
    }
})

export default App