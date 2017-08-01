import {Injectable} from '@angular/core';
@Injectable()

export class UserService{
    constructor(){

    }

    getUsers(){
        return [
            {"id":"1","name":"Saikat","email":"saikat@ex.com"},
            {"id":"2","name":"John","email":"john@ex.com"},
            {"id":"3","name":"Joe","email":"joe@ex.com"},
            {"id":"5","name":"Smith","email":"joe@ex.com"}
        ];
    }
}
