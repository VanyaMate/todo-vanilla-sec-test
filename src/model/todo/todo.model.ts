import { effect, store, combine } from '@vanyamate/sec';
import { addTodo } from '../../action/todo/addTodo';
import { loadTodos } from '../../action/todo/loadTodos';
import { removeTodo } from '../../action/todo/removeTodo';
import { updateTodo } from '../../action/todo/updateTodo';
import { DomainTodo } from '../../types/todo/todo.type';


export const addTodoEffect    = effect(addTodo);
export const loadTodosEffect  = effect(loadTodos);
export const removeTodoEffect = effect(removeTodo);
export const updateTodoEffect = effect(updateTodo);

export const todoLoading = store(false)
    .on(loadTodosEffect, 'onBefore', () => true)
    .on(loadTodosEffect, 'onFinally', () => false);

export const todoAdding = store(false)
    .on(addTodoEffect, 'onBefore', () => true)
    .on(addTodoEffect, 'onFinally', () => false);

export const todoProcess = combine([ todoLoading, todoAdding ], (...args) => args.some((state) => state.get()));

export const todoStatus = store<Record<string, boolean>>({})
    .on(loadTodosEffect, 'onSuccess', (state, { result }) =>
        result ? result.reduce((acc, item) => {
            acc[item.id] = false;
            return acc;
        }, state) : state)
    .on(addTodoEffect, 'onSuccess', (state, { result }) => result ? ({
        ...state,
        [result.id]: false,
    }) : state)
    .on(updateTodoEffect, 'onBefore', (state, { args: [ [ id ] ] }) => {
        return { ...state, [id]: true };
    })
    .on(updateTodoEffect, 'onSuccess', (state, { args: [ [ id ] ] }) => {
        return { ...state, [id]: false };
    })
    .on(removeTodoEffect, 'onBefore', (state, { args: [ id ] }) => {
        return { ...state, [id]: true };
    })
    .on(removeTodoEffect, 'onSuccess', (state, { args: [ id ] }) => {
        delete state[id];
        return { ...state };
    });

export const todoItems = store<Array<DomainTodo>>([])
    .on(loadTodosEffect, 'onSuccess', (_, { result }) => result ?? [])
    .on(removeTodoEffect, 'onSuccess', (state, { args: [ id ] }) => state.filter((item) => item.id !== id))
    .on(
        addTodoEffect,
        'onSuccess',
        (state, { result }) => result ? [ ...state, result ] : state,
    )
    .on(
        updateTodoEffect,
        'onSuccess',
        (state, { result }) =>
            state.map((item) => item.id === result?.id ? result : item),
    );

