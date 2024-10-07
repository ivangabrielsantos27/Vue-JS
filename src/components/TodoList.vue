<template>
    <!-- <h2>TodoList.vue</h2> -->
    <div class="container">
        <div class="row">
            <div class="col-12">
                <p class="display-4">Todo Application</p>
            </div>
        </div>

        <div class="row">
            <newTodo @on-addtodo="addTodo($event)" />
        </div>

        <div class="row">
            <div class="col-12 col-lg-6">
                <uli class="list-group">
                    <TodoIndividual v-for="(todo, index) in todos" :key="index" 
                    :todoString="todo.todoString"
                    :completed="todo.completed"
                    @on-delete="deleteTodo(todo)"
                    @on-toggle="toggleTodo(todo)"
                    @on-edit="editTodo(todo, $event)"
                    />
                </uli>
            </div>
        </div>
    </div>
</template>

<script>
import TodoIndividual from './TodoIndividual.vue';
import newTodo from './NewTodo.vue'

export default {
    components: {
        TodoIndividual,
        newTodo,
    },

    name: 'TodoList',
    data() {
        return {
            todos: [
                {todoString: "Cook Breakfast", completed: false},
                {todoString: "Morning Walks", completed: false},
                {todoString: "Check Emails", completed: false},
                {todoString: "Feeding Pets", completed: false},
            ],
        }
    },

    methods: {
        addTodo(newTodo) {
            this.todos.push({
                todoString: newTodo,
                completed: false
            })
        },
        toggleTodo(todo) {
            todo.completed = !todo.completed;
        },
        editTodo(todo, newTodoString) {
            todo.todoString = newTodoString;
        },
        deleteTodo(deleteTodo) {
            this.todos = this.todos.filter(
                todo => todo.todoString !== deleteTodo.todoString
            );
        },
    },
};
</script>

<style></style>
