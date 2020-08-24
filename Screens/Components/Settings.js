import {Audio} from 'expo-av'

const settings ={
    Recording_Quality: {
        default: Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        options:[
            {displayName: "High", value: Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY},
            {displayName: "Low", value: Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY},
        ],
        currentValue: Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        message: 'For better recording experience turn it to High but it may increase battery consumption.'
    },
    Recording_Time: {
        default: 5,
        currentValue: 5,
        message: 'Set how long the recording should be (in mins)',
    },

    Wait_time:{
        default: 100,
        currentValue: 100,
        message: "The app records recordings in chunks, after recording each chunk it waits for certain time to process the previous chunk. Set the time it should wait (in ms) after recording each chunk.(If app is not working for some reason you may want to increase this)",
    },
    
    Sleep_Time:{
        default: null,
        message: "Specify the time period in which you don't want to record.",
        currentValue: null,
    },
}

export default settings