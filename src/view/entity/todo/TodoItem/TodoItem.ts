import { Component, IComponent } from '../../../_component/Component.ts';
import css from './TodoItem.module.css';


export class TodoItem extends Component {
    constructor (title: string, prefix?: IComponent, postfix?: IComponent) {
        super({
            componentTag: 'article',
            className   : css.container,
            innerHTML   : `<div class="${ css.leftSide }"><h3>${ title }</h3></div>`,
        });

        if (prefix) {
            prefix.insert('afterbegin', this.element.querySelector(`.${ css.leftSide }`)!);
        }

        if (postfix) {
            postfix.insert('beforeend', this.element);
        }
    }
}