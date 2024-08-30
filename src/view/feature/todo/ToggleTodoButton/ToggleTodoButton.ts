import { Component } from '../../../_component/Component.ts';
import { updateTodoEffect } from '../../../../model/todo/todo.model.ts';
import { DomainTodoStatus } from '../../../../types/todo/todo.type.ts';


export class ToggleTodoButton extends Component {
    constructor (private readonly _todoId: string, private readonly _checked: DomainTodoStatus) {
        super({
            componentTag: 'input',
        });

        const input   = this.element as HTMLInputElement;
        input.checked = this._checked === DomainTodoStatus.DONE;
        input.type    = 'checkbox';
        input.addEventListener('change', this._toggle.bind(this));
    }

    private _toggle () {
        const status = this._checked === DomainTodoStatus.DONE
                       ? DomainTodoStatus.IN_PROGRESS
                       : DomainTodoStatus.DONE;

        updateTodoEffect([ this._todoId, { status } ]);
    }
}