import React from 'react'
import './AddNote.css'
import {NavLink} from 'react-router-dom'

const AddNote = () =>{
    return (
            <NavLink className={'add-note'} to={'/note-create/create'}><b>+ Заметка</b></NavLink>
    )
}

export default AddNote