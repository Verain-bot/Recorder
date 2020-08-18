import {createStore,combineReducers} from 'redux'
import {persistStore,persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const ADD_RECORDING = 'ADD_RECORDING'
const REMOVE_RECORDING = 'REMOVE_RECORDING'

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

const Reducer = combineReducers({
    recording: recordingReducer,
})

const persistedReducer = persistReducer(persistConfig,Reducer)

export const addRecording = (RecordingName, RecordingUri) =>({
    type: ADD_RECORDING,
    payload: {RecordingName: RecordingName,RecordingUri: RecordingUri},
})

export const removeRecording = (RecordingUri) =>({
    type: REMOVE_RECORDING,
    payload: RecordingUri,
})

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)