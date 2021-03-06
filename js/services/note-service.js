'use strict';


import utilService from './util-service.js'
import storageService from './storage-service.js'

const KEY = 'notesVilleKey';

export default {
    query,
    deleteNote,
    getNoteById,
    addNewNote,
    editNote
}

var notesDB = []


function query(filter = null) {
    if (notesDB.length > 0) return Promise.resolve(notesDB);
    return storageService.load(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = createInitialNotes();
                storageService.store(KEY, notes);
            }
            notesDB = notes
            if (filter === null) return notes;
            else return notes.filter(note =>
                note.type.toUpperCase().includes(filter.byType.toUpperCase()))
        })
}

function getNoteById(NoteId) {
    var note = notesDB.find(note => note.id === NoteId)
    return Promise.resolve(note);
}

function editNote(noteToSave){
    console.log(noteToSave)
    var idx =  notesDB.findIndex(note=> note.id === noteToSave.id) 
    notesDB[idx] = noteToSave
    storageService.store(KEY, notesDB)
}

function addNewNote(noteToSave){
    noteToSave.id = utilService.makeId(6)
    notesDB.push(noteToSave)
    console.log(notesDB)
    storageService.store(KEY, notesDB)

}


function deleteNote(noteId) {
    var idx = notesDB.findIndex(note => note.id === noteId)
    if(idx === -1) return 
    notesDB.splice(idx, 1)
    storageService.store(KEY, notesDB)
}

function createInitialNotes() {
    return [
        {
            id: utilService.makeId(6),
            title: 'reminder',
            type: 'text',
            txts: ['dont forget to close the AC'],
            background: '#C390D4',
        },
        {
            id: utilService.makeId(6),
            type: 'image',
            title: 'fix the roof',
            txts: ['buying nails'],
            url:'../img/img-icon.png',
            background: '#7EDE96',
        },
        {
            id: utilService.makeId(6),
            type: 'todo',
            title: 'To be done till tomorrow',
            txts: [
                {txt: 'to do landury', isDone: false},
                {txt: 'to do Css', isDone: false}
                ],
            background: '#D9BA5D',
        },

    ]
}


