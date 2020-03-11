import React, {Component} from 'react'
import './App.scss'
import AddNote from './components/AddNote/AddNote'
import Note from './containers/Note/Note'
import Search from './components/Search/Search'
import SortBy from './components/SortBy/SortBy'
import CreateNewNote from './containers/CreateNewNote/CreateNewNote'
import ListMenu from './containers/ListMenu/ListMenu'
import {NavLink, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

class App extends Component {


    render() {
        return (<div className="app">
            <div className="app__said-unit">
                <NavLink to={'/'}><h1>Notes</h1></NavLink>
                <AddNote/>
                <Search/>
                <SortBy/>
                <ListMenu/>
            </div>
            <div className="app__main-unit">
                <Switch>
                    <Route path='/'
                           render={() => <h2 style={{textAlign: 'center', opacity: 0.5, float: 'down'}}>Выберите заметку
                               или создайте новую</h2>} exact/>
                    <Route path='/note-create/:number' component={CreateNewNote} exact/>
                    <Route path='/current-note/:number'  component={Note}/>
                </Switch>
            </div>
        </div>)
    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(null, mapDispatchToProps())(App)
