import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { environment } from '@src/environments/environment';
import { User } from './user.models';
import * as fromActions from './user.actions';
import { NotificationService } from '@app/services';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notification: NotificationService
  ) {}

  sigUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          tap(() => {
            // enviar mail de verificacion
          }),
          map(
            (signUpState) =>
              new fromActions.SignUpEmailSuccess(signUpState.user?.uid ?? ''),
            catchError((error) => {
              this.notification.error(error.message);
              return of(new fromActions.SignUpEmailError(error.message));
            })
          )
        )
      )
    )
  );

  sigInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          switchMap((signInState) =>
            this.afs
              .doc<User>(`users/${signInState.user?.uid ?? ''}`)
              .valueChanges()
              .pipe(
                take(1),
                map(
                  (user) =>
                    new fromActions.SignInEmailSuccess(
                      signInState.user?.uid ?? '',
                      user ?? null
                    )
                )
              )
          ),
          catchError((error) => {
            this.notification.error(error.message);
            return of(new fromActions.SignInEmailError(error.message));
          })
        )
      )
    )
  );

  sigOutEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_OUT_EMAIL),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          map(() => new fromActions.SignOutEmailSuccess()),
          catchError((error) => {
            this.notification.error(error.message);
            return of(new fromActions.SignOutEmailError(error.message));
          })
        )
      )
    )
  );
}
