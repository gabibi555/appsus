'use strict'

export default {
    props: ['note'],
    template: `
    <section class="todo-control" :style="{background: note.background}">
        <div class=todo-input-container>
            <input class="text-input" type="text" v-model="note.title" placeholder="Name Your Note" :style="{background: note.background}">
            <div>
            <button class="btn-todo-note" @click="addNewTodo">Add Todo</button>
            <input class="text-input" type="text" v-model="newTodo.txt">
            </div>
        </div>
        <div class="todo-list">
        <div class="title">{{note.title}}</div>
        <li v-for="(txt,idx) in note.txts" type="text">
            <span v-if="newTodo.isDone" style="textDecoration:line-through;">{{txt.txt}}</span>
            <span v-else>{{txt.txt}}</span>
            <button class="delete-todo-btn" @click="deleteTodo(idx)">X</button>
            <button class="mark-done-btn" @click="markDoneTodo(txt, $event)">✓</button>
        </li>
        </div>
        <button v-if="!note.id" @click="addNote">Save Todo</button>
    </section>
    `,
    data() {
        return {
            newTodo: {
                txt: '',
                isDone: false,
            }
        }
    },
    methods: {
        goBack() {
            this.$router.push('/noteville')
        },

        deleteTodo(todoIdx) {
            this.note.txts.splice(todoIdx, 1)
        },
        addNote() {
            this.$emit('addNewNote', this.note)
        },
        editOldNote() {
            noteService.editNote(this.note)
            this.goBack()
        },
        deleteTodo(todoIdx) {
            this.note.txts.splice(todoIdx, 1)
        },
        markDoneTodo(todo, ev) {
            todo.isDone = !todo.isDone
            if (todo.isDone) {
                ev.path[2].children[0].style.textDecoration = "line-through"
                noteService.editNote(this.note)
            }
            else {
                ev.path[2].children[0].style.textDecoration = "none";
                noteService.editNote(this.note)
            }
        },
        addNewTodo() {
            this.note.txts.push(this.newTodo)
            this.newTodo = {
                txt: '',
                isDone: false,
            }
            this.$emit('addTodo', this.newTodo)
            // noteService.editNote(this.note)
        },
        deleteNote() {
            this.$emit('deleteNote', this.note)
            this.goBack()
        },

    },
    created() {
        console.log(this.note.background)
        console.log('created TODO', this.note)

    },
    computed: {

    }

};