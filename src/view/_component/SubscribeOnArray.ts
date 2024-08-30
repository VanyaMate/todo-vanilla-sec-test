import { Store } from '@vanyamate/sec';
import { Component, IComponent } from './Component.ts';


export class SubscribeOnArray<T> extends Component {
    private _components: Array<IComponent> = [];

    constructor (
        private readonly _store: Store<Array<T>>,
        private readonly _renderItemMethod: (item: T) => IComponent,
    ) {
        super({ componentTag: 'div' });
        const unsubscribe = this._store.subscribe(this._onStoreUpdate.bind(this));
        this._onStoreUpdate();
        this.onDestroy(unsubscribe);
    }

    private _onStoreUpdate () {
        this._components.forEach((component) => component.destroy());
        this._components = this._store.get().map(this._renderItemMethod.bind(this));
        this._components.forEach((component) => component.insert('beforeend', this.element));
    }
}