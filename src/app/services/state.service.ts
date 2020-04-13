import {
  Inject,
  Injectable
} from '@angular/core';
import {
  Action,
  ReducerCallback,
  Reducers,
  State
} from '../models';
import { ActionsService } from '../services/actions.service';
import { AsyncSubject, Subject, BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import reducers from '../services/reducers';

const initialState: State = {
  focusedElement: undefined,
  session: {
    id: undefined,
    token: undefined
  }
};

@Injectable({
  providedIn: 'root'
})

export class StateService {
  constructor(
    private actions: ActionsService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.actions.stream
      .subscribe(action => this.reduce({ ...this.state }, action)
        .subscribe(state => this.updateState(state))
      );
  }

  private appstates: BehaviorSubject<State> = new BehaviorSubject<State>(initialState);

  private reducers: Reducers = reducers;

  readonly states: Observable<State> = this.appstates.asObservable();

  private reduce(state: State, action: Action): Observable<State> {
    const response = new AsyncSubject<State>();
    const callback: ReducerCallback = (nextState: State) => {
      response.next(nextState);
      response.complete();
    };
    if (this.reducers[action.type]) {
      this.reducers[action.type].call(this, state, action, callback);
    } else {
      response.error(`Could not find reducer for action ${action.type}.`);
    }
    return response.asObservable();
  }

  public get state(): State {
    return this.appstates.getValue();
  }

  private updateState(state, response: Subject<boolean> = new Subject<boolean>()): this {
    this.appstates.next(state);
    response.next(true);
    response.complete();
    return this;
  }

  private availableReducers: string[] = [];

  public addReducers(reducer: Reducers, module: string) {
    if (this.availableReducers.includes(module)) {
      return true;
    } else {
      this.availableReducers.push(module);
      this.reducers = { ...this.reducers, ...reducer };
    }
  }
}
