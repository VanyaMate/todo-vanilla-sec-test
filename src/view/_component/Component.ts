export type ComponentProps = {
    componentTag: string;
} & Partial<HTMLElement>;

export interface IComponent {
    element: HTMLElement;
    insert: (position: InsertPosition, element: HTMLElement) => void;
    destroy: () => void;
    onDestroy: (callback: () => void) => void;
}

export class Component implements IComponent {
    private readonly _element: HTMLElement;
    private readonly _onDestroyHandlers: Array<() => void> = [];

    constructor (private readonly _props: ComponentProps) {
        this._element = Object.assign(document.createElement(this._props.componentTag), this._props);
    }

    get element () {
        return this._element;
    }

    insert (position: InsertPosition, element: HTMLElement) {
        element.insertAdjacentElement(position, this._element);
    }

    destroy () {
        this._onDestroyHandlers.forEach((callback) => callback());
        this.element.remove();
    }

    onDestroy (callback: () => void) {
        this._onDestroyHandlers.push(callback);
    }
}