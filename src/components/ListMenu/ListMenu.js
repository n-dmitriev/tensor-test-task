import React, {Component} from 'react'
import './ListMenu.scss'
import ListOfNotes from '../ListOfNotes/ListOfNotes'

export default class ListMenu extends Component {
    state = {
        activeTab: 'notes-tab'
    }

    renderCurrentTab() {
        if(this.state.activeTab === 'notes-tab')
            return <ListOfNotes list={'notes-tab'}/>
        else if(this.state.activeTab === 'chosen-tab')
            return <ListOfNotes list={'chosen-tab'}/>
        else
            return null
    }

    clickItemHandler(event){
        this.setState({
            activeTab: event.target.id
        })
    }

    render() {
        return (
            <>
                <ul className={'list-menu'}>
                    <li id={'notes-tab'}
                        className={this.state.activeTab === 'notes-tab' ? 'list-menu__active-tab' : ''}
                        onClick={this.clickItemHandler.bind(this)}
                    >
                        <h2 className={'non-click'}>Заметки</h2>
                    </li>
                    <li id={'chosen-tab'}
                        className={this.state.activeTab === 'chosen-tab' ? 'list-menu__active-tab' : ''}
                        onClick={this.clickItemHandler.bind(this)}
                    >
                        <h2 className={'non-click'}>Избранное</h2>
                    </li>
                </ul>
                {this.renderCurrentTab()}
            </>
        )
    }
}