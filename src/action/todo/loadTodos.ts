import { TODO_LOCAL_STORAGE_NAME } from './const.ts';
import type { DomainTodo } from '../../types/todo/todo.type';


export const loadTodos = function (): Promise<DomainTodo[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE_NAME) ?? '[]'));
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });
};