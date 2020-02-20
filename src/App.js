import React from 'react'
import './App.css'
import AddNote from './components/AddNote/AddNote'
import ListOfNotes from './components/ListOfNotes/ListOfNotes'
import Note from './components/Note/Note'
import Search from './components/Search/Search'
import SortBy from './components/SortBy/SortBy'
import CreateNewNote from './components/CreateNewNote/CreateNewNote'
import {NavLink, Route, Switch} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <div className="said-unit">
                <NavLink to={'/'}><h1>Notes</h1></NavLink>
                <AddNote/>
                <Search/>
                <SortBy/>
                <h2>Ваши заметки:</h2>
                <ListOfNotes/>
            </div>
            <div className="main-unit">
                <Switch>
                    <Route path ='/' render={()=><h2 style={{textAlign: 'center', opacity: 0.5, float: 'down'}}>Выберите заметку или создайте новую</h2>} exact/>
                    <Route path ='/note-create/:number' component={CreateNewNote} exact/>
                    <Route path ='/current-note/:number' component={Note} />
                    <Route render={()=><NavLink to={'/'}><h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1></NavLink>}/>
                </Switch>
            </div>
        </div>
    )
}

export default App
