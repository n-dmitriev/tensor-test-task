import React, {Component} from 'react'
import './Note.scss'
import oldStore from '../../store/oldStore'
import {NavLink} from 'react-router-dom'


class Note extends Component {
    addToChosen(e) {
        const idList = e.target.id.split('-')
        oldStore.invertNoteToChosen(`${idList[1]}-${idList[2]}`)
        if (e.target.classList.contains('fa-star_active') === false)
            e.target.classList.add('fa-star_active')
        else
            e.target.classList.remove('fa-star_active')
    }

    renderNote() {
        const activeNote = oldStore.getNoteById(this.props.match.params.number)
        return (
            <div key={activeNote.id} className={'content-section'}>
                <i className={activeNote.chosen === true ? 'fa fa-star fa-star_active' : 'fa fa-star'}
                   id={'add-' + activeNote.id} aria-hidden="true" onClick={this.addToChosen}></i>
                <h2>{activeNote.header}</h2>
                <hr/>
                <p>{activeNote.content}
                    <br/>
                    <span className={'active-note__data'}>{activeNote.data.split(' ').slice(1, 5).join(' ')}</span>
                    <br/></p>
                <div className={'button-section'}>
                    <NavLink className={'main-item-style'} to={`/note-create/${activeNote.id}`}>Редактировать</NavLink>
                    <NavLink className={'main-item-style'} to={'/'} onClick={(() => {
                        oldStore.deleteNoteById(activeNote.id)
                    })}>Удалить</NavLink>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={'active-note'}>
                {this.renderNote()}
            </div>
        )
    }
}

export default Note