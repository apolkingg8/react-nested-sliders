import {makeAutoObservable} from "mobx";

export class Store {



    constructor() {
        makeAutoObservable(this)
    }
}

export default new Store()