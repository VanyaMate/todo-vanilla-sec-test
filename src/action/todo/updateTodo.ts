import { TODO_LOCAL_STORAGE_NAME } from './const.ts';
import type { DomainUpdateType } from '../../types/todo/update-todo.types';
import type { DomainTodo } from '../../types/todo/todo.type';


export const updateTodo = function (updateData: [ string, DomainUpdateType ]): Promise<DomainTodo> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const [ id, data ]        = updateData;
                const todos: DomainTodo[] = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE_NAME) ?? '[]');

                for (let i = 0; i < todos.length; i++) {
                    const todo = todos[i];
                    if (todo.id === id) {
                        todos[i] = { ...todo, ...data };
                        localStorage.setItem(TODO_LOCAL_STORAGE_NAME, JSON.stringify(todos));
                        resolve(todos[i]);
                        break;
                    }
                }

                reject(new Error('Todo not exist'));
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });
};