import React, {Component} from 'react'
import './ListOfNotes.css'
import {NavLink} from 'react-router-dom'
import store from '../../store/store'

class ListOfNotes extends Component {
    state = {
        notes: [],
    }
    componentDidMount() {
        store.addSubscriber( (list)=>{this.setState({notes: list})})
    }

    renderNotes() {
        const listOfNotes = this.state.notes
        return listOfNotes.map(note => {
            return (
                <NavLink id={note.id} key={note.id} className={'note'} to={`/current-note/${note.id}`}>
                    <h3 className="non-click">{note.header}</h3>
                    <p className="non-click"><i>{note.content.split(' ').slice(0, 6).join(' ')}...</i></p>
                    <span className={'data'}>{note.data.split(' ').slice(1, 4).join(' ')}</span>
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