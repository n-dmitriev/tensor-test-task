import {DOWNLOAD_STORE} from './actionTypes'

export function fetchNoteList() {
    return (dispatch) =>{
        let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
        localStorage.setItem('items', JSON.stringify(itemsArray))
        dispatch(setLocalState(itemsArray))
    }
}

export function setLocalState(itemsArray) {
    return {
        type: DOWNLOAD_STORE,
        listOfNotes: itemsArray,
    }
}

export function deleteNoteById(id) {
    const index = this.state.listOfNotes.findIndex(x => x.id === id)
    if (index > -1) {
        this.state.listOfNotes.splice(index, 1)
    }
    localStorage.setItem('items', JSON.stringify(this.state.listOfNotes))
}

export function invertNoteToChosen(id) {
    const element = this.getNoteById(id)
    element.chosen = !element.chosen
    localStorage.setItem('items', JSON.stringify(this.state.listOfNotes))
}

export function getNoteById (id) {
    const index = this.listOfNotes.findIndex(x => x.id === id)
    return this.state.listOfNotes[index]
}