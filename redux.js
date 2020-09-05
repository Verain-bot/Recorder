import {createStore,combineReducers} from 'redux'
import {persistStore,persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import Settings from './Screens/Components/Settings'

const ADD_RECORDING = 'ADD_RECORDING'
const REMOVE_RECORDING = 'REMOVE_RECORDING'
const ADD_TEMP_RECORDING = 'ADD_TEMP_RECORDING'
const REMOVE_TEMP_RECORDING = 'REMOVE_TEMP_RECORDING'
const CHANGE_SETTING = 'CHANGE_SETTING'
const SET_DEFAULT_SETTINGS = 'SET_DEFAULT_SETTINGS'
const CLEAR_TEMP = 'CLEAR_TEMP'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

const recordingReducer = (state=[],action) =>
{
    switch(action.type)
    {
        case ADD_RECORDING:
            return [...state, action.payload]
        case REMOVE_RECORDING:
            return state.filter( ({RecordingUri})=> RecordingUri!==action.payload )
        default:
            return state
    }
}

const tempRecordingReducer = (state=[],action) =>
{
    switch(action.type)
    {
        case ADD_TEMP_RECORDING:
            return [...state,action.payload]
        case REMOVE_TEMP_RECORDING:
            return state.filter( ({RecordingUri})=> RecordingUri!==action.payload )
        case CLEAR_TEMP:
            return []
        default:
            return state
    }
}

const settingsReducer = (state=Settings,action)=>
{
    switch(action.type)
    {
        case CHANGE_SETTING:{
            return({...state, [action.name]: {...state[action.name], currentValue: action.payload} })
        }
        case SET_DEFAULT_SETTINGS:{
            return(Settings)
        }
        default:
            return state
    }
}

export const changeSetting = (name,newValue)=>
({
    type: CHANGE_SETTING,
    payload: newValue,
    name: name,
})

export const clearTemp = ()=>({
    type: CLEAR_TEMP,
})

export const changeToDefault = ()=>
({
    type: SET_DEFAULT_SETTINGS,
})

const Reducer = combineReducers({
    recording: recordingReducer,
    tempRecording: tempRecordingReducer,
    settings: settingsReducer,
})

const persistedReducer = persistReducer(persistConfig,Reducer)

export const addRecording = (RecordingName, RecordingUri) =>({
    type: ADD_RECORDING,
    payload: {RecordingName: RecordingName,RecordingUri: RecordingUri},
})

export const addTempRecording = (RecordingUri) =>({
    type: ADD_TEMP_RECORDING,
    payload: {RecordingUri: RecordingUri},
})

export const removeRecording = (RecordingUri) =>({
    type: REMOVE_RECORDING,
    payload: RecordingUri,
})

export const removeTempRecording = (RecordingUri) =>({
    type: REMOVE_TEMP_RECORDING,
    payload: RecordingUri,
})

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)