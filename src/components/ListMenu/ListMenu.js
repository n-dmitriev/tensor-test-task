import React, {Component} from 'react'
import './ListMenu.scss'
import ListOfNotes from '../ListOfNotes/ListOfNotes'
import oldStore from '../../store/oldStore'

export default class ListMenu extends Component {
    state = {
        activeTab: 'notes-tab',
        notes: [],
    }

    componentDidMount() {
        oldStore.addSubscriber((list) => {
            this.setState({notes: list})
        })
    }

    renderCurrentTab() {
        if (this.state.activeTab === 'notes-tab')
            return <ListOfNotes list={'notes-tab'} notes={this.state.notes}
                                delete={oldStore.deleteNoteById}
                                invert={oldStore.invertNoteToChosen}

            />
        else if (this.state.activeTab === 'chosen-tab')
            return <ListOfNotes list={'chosen-tab'} notes={oldStore.getChosenList(this.state.notes)}
                                delete={oldStore.deleteNoteById}
                                invert={oldStore.invertNoteToChosen}
            />
        else
            return null
    }

    clickItemHandler(event) {
        this.setState({
            activeTab: event.target.id,
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