import React, {Component} from 'react'
import './CreateNewNote.scss'
import oldStore from '../../store/oldStore'
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
        chosen:{
            flag: null,
            itsChange: false,
        }
    }

    componentDidMount() {
        oldStore.addSubscriber(() => {
        })
    }

    headerChange(event) {
        this.setState({header: {content: event.target.value, itsChange: true}})
    }

    textInputChange(event) {
        this.setState({text: {content: event.target.value, itsChange: true}})
    }

    chosenChange(e) {
        if (this.state.chosen.flag === null) {
            this.setState({
                chosen: {
                    flag: !e.target.value,
                    itsChange: true
                }
            })
        } else
            this.setState({
                chosen: !this.state.chosen,
            })
    }

    renderForm() {
        const id = this.props.match.params.number
        let activeNote, editing = false
        if (id === 'create')
            activeNote = {}
        else {
            activeNote = oldStore.getNoteById(id)
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

                <div className={'chosen-check'}>
                    <input type="checkbox" className="checkbox" id="checkbox" value={activeNote.chosen}
                           onChange={this.chosenChange.bind(this)}
                           defaultChecked={activeNote.chosen === true ? 'checked' : ''}
                    />
                    <label htmlFor="checkbox">Добавить эту заметку в избранное?</label>
                </div>

                <div className={'button-section'}>
                    <NavLink to={`${editing === true ? '/current-note/' + id : '/'}`}
                             className={'main-item-style'} onClick={() => {
                        if (editing === true) {
                            let header, text, chosen
                            this.state.chosen === null ? chosen = activeNote.chosen : chosen = this.state.chosen
                            this.state.header.itsChange === true
                                ? header = this.state.header.content
                                : header = activeNote.header
                            this.state.text.itsChange === true
                                ? text = this.state.text.content
                                : text = activeNote.content
                            oldStore.setNote(id, header, text, `${new Date()}`, chosen)
                        } else
                            oldStore.addNote(this.state.header.content, this.state.text.content, `${new Date()}`,
                                this.state.chosen === null?false:this.state.chosen)
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