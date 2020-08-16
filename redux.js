import {createStore,combineReducers} from 'redux'

const ADD_RECORDING = 'ADD_RECORDING'
const REMOVE_RECORDING = 'REMOVE_RECORDING'

const recordingReducer = (state=[],action) =>
{
    switch(action.type)
    {
        case ADD_RECORDING:
            return [...state, action.payload]
        case REMOVE_RECORDING:
            return state.filter( ({RecordingName})=> RecordingName!==action.payload )
        default:
            return state
    }
}

const Reducer = combineReducers({
    recording: recordingReducer,
})

export const addRecording = (RecordingName, RecordingUri) =>({
    type: ADD_RECORDING,
    payload: {RecordingName: RecordingName,RecordingUri: RecordingUri},
})

export const removeRecording = (RecordingName) =>({
    type: REMOVE_RECORDING,
    payload: RecordingName,
})

export const store = createStore(Reducer)