import { TODO_LOCAL_STORAGE_NAME } from './const.ts';
import type { DomainTodo } from '../../types/todo/todo.type';
import type { DomainCreateTodo } from '../../types/todo/create-todo.type';
import { DomainTodoStatus } from '../../types/todo/todo.type';


export const addTodo = function (data: DomainCreateTodo): Promise<DomainTodo> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const todo: DomainTodo    = {
                    id    : Math.random().toString(),
                    title : data.title,
                    status: DomainTodoStatus.AWAIT,
                };
                const todos: DomainTodo[] = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE_NAME) ?? '[]');

                todos.push(todo);
                localStorage.setItem(TODO_LOCAL_STORAGE_NAME, JSON.stringify(todos));

                resolve(todo);
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });
};