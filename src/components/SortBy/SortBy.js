import React from 'react'
import oldStore from '../../store/oldStore'
import './SortBy.scss'

const SortBy = () => {
    return (
        <div className={'sort-by'}>
            <select onChange={() => {oldStore.sortArr()}} className={'main-item-style'}>
                <option value="ascending">Сортировать по возрастанию даты</option>
                <option value="decrease">Сортировать поубыванию даты</option>
            </select>
        </div>
    )
}

export default SortBy