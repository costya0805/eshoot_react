import {makeAutoObservable} from 'mobx';

class CurrentUser{
    constructor(){
        makeAutoObservable(this);
    }

}

export default CurrentUser