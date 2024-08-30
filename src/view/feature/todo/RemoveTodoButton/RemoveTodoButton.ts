import { Component } from '../../../_component/Component.ts';
import css from './RemoveTodoButton.module.css';
import { removeTodoEffect } from '../../../../model/todo/todo.model.ts';


export class RemoveTodoButton extends Component {
    constructor (private readonly _todoId: string) {
        super({
            componentTag: 'button',
            className   : css.container,
            innerHTML   : 'Удалить',
        });

        this.element.addEventListener('click', this._onClick.bind(this));
    }

    private _onClick () {
        this.element.classList.add(css.loading);
        removeTodoEffect(this._todoId).finally(() => this.element.classList.remove(css.loading));
    }
}