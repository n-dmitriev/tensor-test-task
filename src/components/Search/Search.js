import React from 'react'
import store from '../../store/store'
import { Redirect } from 'react-router-dom';

class Search extends React.Component{
    state = {
        redirect: false,
        id: ''
    }

    render() {
        return (
            <div className={'search'}>
                <input onChange={(e)=>{
                    if (store.searchNote(e.target.value)!== null)
                        this.setState({redirect: true, id: store.searchNote(e.target.value)})
                    else this.setState({redirect: false, id: ''})
                }} className={'app-style'} type="text" name="text" placeholder="Поиск по заголовку..."/>
                {this.state.redirect === true ?<Redirect to={`/current-note/${this.state.id}`} />:<Redirect to={'/'} />}
            </div>
        )
    }
}

export default Search