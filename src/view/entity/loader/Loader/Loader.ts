import { Component } from '../../../_component/Component.ts';
import css from './Loader.module.css';


export class Loader extends Component {
    constructor () {
        super({ componentTag: 'div', className: css.container });
    }
}