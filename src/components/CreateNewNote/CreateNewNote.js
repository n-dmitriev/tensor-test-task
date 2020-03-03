import React, {Component} from 'react'
import './CreateNewNote.scss'
import store from '../../store/store'
import {NavLink} from 'react-router-dom'

export default class CreateNewNote extends Component {
    state = {
        header: {
            content: '',
            itsChange: false,
        },
        text: {
            content: '',
            itsChange: false,
        },
    }

    componentDidMount() {
        store.addSubscriber(() => {
        })
    }

    headerChange(event) {
        this.setState({header: {content: event.target.value, itsChange: true}})
    }

    textInputChange(event) {
        this.setState({text: {content: event.target.value, itsChange: true}})
    }

    renderForm() {
        const id = this.props.match.params.number
        let activeNote, editing = false
        if (id === 'create')
            activeNote = {}
        else {
            activeNote = store.getNoteById(id)
            editing = true
        }
        return (
            <div key={'note-creator'} className={'content-section'}>
                <h2>{editing === true
                    ? 'Редактирование заметки'
                    : 'Создание заметки'
                }</h2>
                <input type="text" name="input-header" placeholder="Введите заголовок"
                       defaultValue={editing === true
                           ? activeNote.header
                           : ''
                       }
                       onChange={this.headerChange.bind(this)}
                />
                <hr/>
                <textarea name="input-text" id="" cols="30" rows="10" placeholder="Введите текст заметки"
                          defaultValue={editing === true
                              ? activeNote.content
                              : ''
                          }
                          onChange={this.textInputChange.bind(this)}>
                </textarea>
                <div className={'button-section'}>
                    <NavLink to={`${editing === true ? '/current-note/' + id : '/'}`}
                             className={'main-item-style'} onClick={() => {
                        if (editing === true) {
                            let header, text
                            this.state.header.itsChange === true
                                ? header = this.state.header.content
                                : header = activeNote.header
                            this.state.text.itsChange === true
                                ? text = this.state.text.content
                                : text = activeNote.content
                            store.setNote(id, header, text, `${new Date()}`)
                        } else
                            store.addNote(this.state.header.content, this.state.text.content, `${new Date()}`)
                    }}>Сохранить
                    </NavLink>
                    <NavLink className={'main-item-style'}
                        to={`${editing === true ? '/current-note/' + id : '/'}`}>
                        {editing === true ? 'Отменить' : 'Удалить'}
                    </NavLink>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={'create-note'}>
                {this.renderForm()}
            </div>
        )
    }
}