import React, {Component} from 'react'
import './ListMenu.scss'
import ListOfNotes from '../../components/ListOfNotes/ListOfNotes'
import oldStore from '../../store/oldStore'
import {connect} from 'react-redux'
import {deleteNoteById, fetchNoteList, invertNoteToChosen} from '../../store/actions/noteList'

class ListMenu extends Component {
    state = {
        activeTab: 'notes-tab',
        //notes: [],
    }

    componentDidMount() {
        /*oldStore.addSubscriber((list) => {
            this.setState({notes: list})
        })*/
        this.props.fetchNoteList()
    }

    renderCurrentTab() {
        console.log(this.props)
        if (this.state.activeTab === 'notes-tab')
            return <ListOfNotes list={'notes-tab'} notes={this.props.notes}
                                delete={this.props.deleteNoteById}
                                invert={this.props.invertNoteToChosen}

            />
        else if (this.state.activeTab === 'chosen-tab')
            return <ListOfNotes list={'chosen-tab'} notes={oldStore.getChosenList(this.props.notes)}
                                delete={this.props.deleteNoteById}
                                invert={this.props.invertNoteToChosen}
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

function mapStateToProps(state){
    return{
        notes: state.noteReducer.listOfNotes
    }
}

function mapDispatchToProps(dispatch) {
    return{
        fetchNoteList: () => dispatch(fetchNoteList()),
        deleteNoteById: (id) =>dispatch(deleteNoteById(id)),
        invertNoteToChosen: (id) => dispatch(invertNoteToChosen(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu)