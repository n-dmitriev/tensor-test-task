import React from 'react'
import oldStore from '../../store/oldStore'
import { Redirect } from 'react-router-dom'

class Search extends React.Component{
    state = {
        redirect: false,
        id: ''
    }

    changeHandler(e) {
        if (oldStore.searchNote(e.target.value)!== null)
            this.setState({redirect: true, id: oldStore.searchNote(e.target.value)})
        else this.setState({redirect: false, id: ''})
    }

    render() {
        return (
            <div className={'search'}>
                <input onChange={this.changeHandler.bind(this)} className={'main-item-style'} type="text" name="text" placeholder="Поиск по заголовку..."/>
                {this.state.redirect === true ?<Redirect to={`/current-note/${this.state.id}`} />:<Redirect to={'/'} />}
            </div>
        )
    }
}

export default Search