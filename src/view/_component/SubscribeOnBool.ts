import { Component, IComponent } from './Component.ts';
import { Store } from '@vanyamate/sec';


export class SubscribeOnBool extends Component {
    private _currentComponent: IComponent | null = null;

    constructor (
        private readonly _store: Store<boolean>,
        private readonly _onTrue: () => IComponent,
        private readonly _onFalse: () => IComponent,
    ) {
        super({ componentTag: 'div' });
        const unsubscribe = this._store.subscribe(this._toggle.bind(this));
        this._toggle(this._store.get());
        this.onDestroy(unsubscribe);
    }

    private _toggle (state: boolean) {
        this._currentComponent?.destroy();
        this._currentComponent = state ? this._onTrue() : this._onFalse();
        this._currentComponent.insert('beforeend', this.element);
    }
}