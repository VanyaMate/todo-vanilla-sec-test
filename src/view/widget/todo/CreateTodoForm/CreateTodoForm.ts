import { Component } from '../../../_component/Component.ts';
import {
    addTodoEffect,
    todoAdding,
} from '../../../../model/todo/todo.model.ts';
import css from './CreateTodoForm.module.css';


export class CreateTodoForm extends Component {
    constructor () {
        super({
            componentTag: 'form',
            innerHTML   : `
                <h2>Добавить задачу</h2>
                <input type="text" placeholder="Введите задачу"/>
                <button type="submit">Добавить</button>
            `,
            className   : css.container,
        });

        this.element.addEventListener('submit', this._onSubmit.bind(this));
        const unsubscribe = todoAdding.subscribe(this._onAdding.bind(this));
        this.onDestroy(unsubscribe);
    }

    private _onSubmit (event: Event) {
        event.preventDefault();

        const input = this.element.querySelector('input')!;
        const value = input.value.trim();

        if (value !== '') {
            addTodoEffect({ title: value })
                .then(() => input.value = '');
        }
    }

    private _onAdding (status: boolean) {
        if (status) {
            this.element.classList.add(css.adding);
        } else {
            this.element.classList.remove(css.adding);
        }
    }
}