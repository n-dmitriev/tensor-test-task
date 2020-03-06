import React, {Component} from 'react'
import './ListOfNotes.scss'
import {NavLink} from 'react-router-dom'
import store from '../../store/store'

class ListOfNotes extends Component {
    state = {
        notes: [],
    }
    componentDidMount() {
        store.addSubscriber( (list)=>{this.setState({notes: list})})
    }

    deleteNoteHandler(e) {
        e.preventDefault()
        const idList = e.target.id.split('-')
        store.deleteNoteById(`${idList[1]}-${idList[2]}`)
    }

    renderNotes() {
        const listOfNotes = this.state.notes
        if(listOfNotes.length === 0)
            return <b className={'list-notes__message-no-notes'}>Вы ещё не создали заметок...</b>
        return listOfNotes.map(note => {
            return (
                <NavLink id={note.id} key={note.id} className={'list-notes__note'} to={`/current-note/${note.id}`}>
                    <span className={'deleted'} id={'close-'+note.id} onClick={this.deleteNoteHandler}></span>
                    <div className="non-click">
                        <h3>{note.header}</h3>
                        <p><i>{note.content.split(' ').slice(0, 6).join(' ')}...</i></p>
                        <span className={'list-notes__data'}>{note.data.split(' ').slice(1, 4).join(' ')}</span>
                    </div>
                </NavLink>
            )
        })
    }

    render() {
        return (
            <>
                <h2>Ваши заметки:</h2>
                <div className={'list-notes'}>
                    {this.renderNotes()}
                </div>
            </>
        )
    }
}

export default ListOfNotes