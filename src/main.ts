import './style.css';
import { TodoItem } from './view/entity/todo/TodoItem/TodoItem.ts';
import { Col } from './view/shared/container/Col/Col.ts';
import {
    CreateTodoForm,
} from './view/widget/todo/CreateTodoForm/CreateTodoForm.ts';
import { SubscribeOnArray } from './view/_component/SubscribeOnArray.ts';
import {
    loadTodosEffect,
    todoItems,
    todoLoading,
} from './model/todo/todo.model.ts';
import { DomainTodo } from './types/todo/todo.type.ts';
import {
    RemoveTodoButton,
} from './view/feature/todo/RemoveTodoButton/RemoveTodoButton.ts';
import { SubscribeOnBool } from './view/_component/SubscribeOnBool.ts';
import { Loader } from './view/entity/loader/Loader/Loader.ts';
import {
    ToggleTodoButton,
} from './view/feature/todo/ToggleTodoButton/ToggleTodoButton.ts';


loadTodosEffect();

const row = new Col(
    new CreateTodoForm(),
    new SubscribeOnBool(
        todoLoading,
        () => new Loader(),
        () => new SubscribeOnArray(
            todoItems,
            (todo: DomainTodo) => new TodoItem(
                todo.title,
                new ToggleTodoButton(todo.id, todo.status),
                new RemoveTodoButton(todo.id),
            ),
        ),
    ),
);

row.insert('afterbegin', document.querySelector('#app')!);