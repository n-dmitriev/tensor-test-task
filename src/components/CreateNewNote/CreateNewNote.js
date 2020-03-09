import React, {Component} from 'react'
import './CreateNewNote.scss'
import oldStore from '../../store/oldStore'
import {Redirect} from 'react-router-dom'

export default class CreateNewNote extends Component {
    state = {
        id: this.props.match.params.number,
        redirect: false,
    }

    componentDidMount() {
        oldStore.addSubscriber(() => {
        })
    }

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.reset = this.reset.bind(this)
        this.input = React.createRef()
        this.text = React.createRef()
        this.chosen = React.createRef()
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.state.id === 'create')
            oldStore.addNote(this.input.current.value, this.text.current.value, `${new Date()}`, this.chosen.current.checked)
        else
            oldStore.setNote(this.state.id, this.input.current.value, this.text.current.value, `${new Date()}`, this.chosen.current.checked)
        this.setState({
            redirect: true,
        })
    }

    reset() {
        this.setState({
            redirect: true,
        })
    }

    renderForm() {
        let activeNote, editing = false
        if (this.state.id === 'create')
            activeNote = {}
        else {
            activeNote = oldStore.getNoteById(this.state.id)
            editing = true
        }
        return (
            <form key={'note-creator'} className={'content-section'} onSubmit={this.handleSubmit} onReset={this.reset}>
                <h2>{editing === true
                    ? 'Редактирование заметки'
                    : 'Создание заметки'
                }</h2>
                <input type="text" ref={this.input} placeholder="Введите заголовок"
                       defaultValue={editing === true
                           ? activeNote.header
                           : ''
                       }/>
                <hr/>
                <textarea ref={this.text} cols="30" rows="10" placeholder="Введите текст заметки"
                          defaultValue={editing === true
                              ? activeNote.content
                              : ''
                          }>
                </textarea>
                <div className={'chosen-check'}>
                    <input ref={this.chosen} type="checkbox" className="checkbox" id="checkbox"
                           defaultChecked={activeNote.chosen === true ? 'checked' : ''}
                    />
                    <label htmlFor="checkbox">Добавить эту заметку в избранное?</label>
                </div>
                <div className={'button-section'}>
                    <button type="submit" className={'main-item-style'}>
                        Сохранить
                    </button>
                    <button type="reset" className={'main-item-style'}>
                        {editing === true ? 'Отменить' : 'Удалить'}
                    </button>
                </div>
                {this.state.redirect === true ?
                    <Redirect to={`${editing === true ? '/current-note/' + this.state.id : '/'}`}/> : null}
            </form>
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