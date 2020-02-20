let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(itemsArray))

const store = {
    listOfNotes: itemsArray,
    subscribers: [],
    addSubscriber: function (caller) {
        this.subscribers.push({'func': caller})
        caller(this.listOfNotes)
    },
    getNoteById: function (id) {
        const index = this.listOfNotes.findIndex(x => x.id === id)
        return this.listOfNotes[index]
    },
    setNote: function (id, header, content, data) {
        const note = this.getNoteById(id)
        note.content = content
        note.header = header
        note.data = data
        this.subscribers.forEach((c) => c.func(this.listOfNotes))
        localStorage.setItem('items', JSON.stringify(this.listOfNotes))
    },
    addNote: function (header, content, data) {
        const id = `note-${Math.random().toString(36).substr(2, 9)}`
       this.listOfNotes.unshift({
           id: id,header, content, data
       })
        this.subscribers.forEach((c) => c.func(this.listOfNotes))
        localStorage.setItem('items', JSON.stringify(this.listOfNotes))
        return id
    },
    deleteNoteById: function (id) {
        const index = this.listOfNotes.findIndex(x => x.id === id)
        if (index > -1) {
            this.listOfNotes.splice(index, 1);
        }
        this.subscribers.forEach((c) => c.func(this.listOfNotes))
        localStorage.setItem('items', JSON.stringify(this.listOfNotes))
    },
    sortArr: function () {
        this.listOfNotes.reverse()
        this.subscribers.forEach((c) => c.func(this.listOfNotes))
    },
    searchNote: function (header) {
        if (header === '')
            return null
        const index = this.listOfNotes.findIndex(x => x.header.indexOf(header) !== -1)
        if(index === -1)
            return null
        else
            return this.listOfNotes[index].id
    }
}

export default store