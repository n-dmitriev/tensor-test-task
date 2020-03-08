import React, {Component} from 'react'
import './ListOfNotes.scss'
import {NavLink} from 'react-router-dom'
import oldStore from '../../store/oldStore'

class ListOfNotes extends Component {
    state = {
        notes: [],
    }

    componentDidMount() {
        oldStore.addSubscriber((list) => {
            this.setState({notes: list})
        })
    }

    /* if(this.props.list === 'notes-tab')
            oldStore.addSubscriber((list) => {
                this.setState({notes: list})
            })
        else if (this.props.list === 'chosen-tab')
            oldStore.addSubscriber(() => {
                this.setState({notes: oldStore.getChosenList()})
            })*/

    deleteNoteHandler(e) {
        e.preventDefault()
        const idList = e.target.id.split('-')
        oldStore.deleteNoteById(`${idList[1]}-${idList[2]}`)
    }

    addToChosen(e){
        e.preventDefault()
        const idList = e.target.id.split('-')
        oldStore.invertNoteToChosen(`${idList[1]}-${idList[2]}`)
        if (e.target.classList.contains('fa-star_active') === false)
            e.target.classList.add('fa-star_active')
        else
            e.target.classList.remove('fa-star_active')
    }

    renderNotes() {
        const listOfNotes = this.state.notes
        if (listOfNotes.length === 0){
            if(this.props.list === 'notes-tab')
                return <b className={'list-notes__message-no-notes'}>Вы ещё не создали заметок...</b>
            else if (this.props.list === 'chosen-tab')
                return <b className={'list-notes__message-no-notes'}>Вы ещё не добавили заметок в избранное...</b>
            else return null
        }
        return listOfNotes.map(note => {
            return (
                <NavLink id={note.id} key={note.id} className={'list-notes__note'} to={`/current-note/${note.id}`}>
                    <span className={'deleted'} id={'close-' + note.id} onClick={this.deleteNoteHandler}></span>
                    <i className={note.chosen === true ? 'fa fa-star fa-star_active' : 'fa fa-star'}
                       id={'add-' + note.id} aria-hidden="true" onClick={this.addToChosen}></i>
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
            <div className={'list-notes'}>
                {this.renderNotes()}
            </div>
        )
    }
}

export default ListOfNotes