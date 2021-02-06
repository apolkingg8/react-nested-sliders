import {makeAutoObservable} from "mobx";

export interface Data {

}

export class Store {

    private _data: Data

    get data(): Data {
        return this._data
    }

    set data(source) {
        this._data = source
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Store()