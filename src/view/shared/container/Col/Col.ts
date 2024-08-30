import { Component, IComponent } from '../../../_component/Component.ts';
import css from './Col.module.css';


export class Col extends Component {
    constructor (...components: Array<IComponent>) {
        super({
            componentTag: 'div',
            className   : css.container,
        });

        components.forEach((component) => component.insert('beforeend', this.element));
    }
}