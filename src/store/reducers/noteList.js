import {DOWNLOAD_STORE} from '../actions/actionTypes'

const initialState = {
    listOfNotes: [],
}

export default function noteReducer(state = initialState, action) {
    switch (action.type) {
        case DOWNLOAD_STORE:
            return {
                listOfNotes: action.listOfNotes
            }
        default:
            return state
    }
}