'use strict';

import noteService from '../services/note-service.js'
import noteTxt from '../cmps/notes-cmps/note-txt.cmp.js'
import noteList from '../cmps/notes-cmps/note-list.cmp.js'

export default {
    template: `
        <section class="note-app">
        <h1>Welcome To NoteVille</h1>
        <note-list :notes="notes"></note-list>
        </section>
    `,
    data() {
        return {
            notes:[]
        }
    },
    methods: {
       

    },
    created() {
        noteService.query()
        .then(notes => this.notes = notes)
    },
    computed: {

    },
    components:{
        noteService,
        noteTxt,
        noteList
    }

};