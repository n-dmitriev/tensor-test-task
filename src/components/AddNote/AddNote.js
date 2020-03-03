import React from 'react'
import './AddNote.scss'
import {NavLink} from 'react-router-dom'

const AddNote = () =>{
    return (
            <NavLink className={'main-item-style add-note'} to={'/note-create/create'}><b>+ Заметка</b></NavLink>
    )
}

export default AddNote