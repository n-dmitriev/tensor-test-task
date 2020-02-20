import React, {Component} from 'react'
import './Note.css'
import store from '../../store/store'
import {NavLink} from 'react-router-dom'


class Note extends Component {
    renderNote(){
        const activeNote = store.getNoteById(this.props.match.params.number)
        return(
            <div key={activeNote.id} className={'note'}>
                <h2>{activeNote.header}</h2>
                <hr/>
                <p>{activeNote.content}
                    <br/>
                    <span className={'data'}>{activeNote.data.split(' ').slice(1, 5).join(' ')}</span>
                    <br/></p>
                <div className={'button-section'}>
                    <NavLink className={'app-style'} to={`/note-create/${activeNote.id}`}>Редактировать</NavLink>
                    <NavLink className={'app-style'} to={'/'} onClick={(() => {
                        store.deleteNoteById(activeNote.id)
                    })}>Удалить</NavLink>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className={'active-note'}>
                {this.renderNote()}
            </div>
        )
    }
}

export default Note