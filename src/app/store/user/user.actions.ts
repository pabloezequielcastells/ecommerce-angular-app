import { Action } from '@ngrx/store';
import { User, EmailPasswordCredentials } from './user.models';

export enum Types {

  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: UnAuthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGN_IN_EMAIL = '[User] Login con email: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Login con email: Success',
  SIGN_IN_EMAIL_ERROR = '[User] Login con email: Error',

  SIGN_UP_EMAIL = '[User] Sign up con email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Sign up con email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Sign up con email: Error',

  SIGN_OUT_EMAIL = '[User] Sign out con email: Start',
  SIGN_OUT_EMAIL_SUCCESS = '[User] Sign out con email: Success',
  SIGN_OUT_EMAIL_ERROR = '[User] Sign out con email: Error',
}

// Init
export class Init implements Action {
  readonly type = Types.INIT;
  constructor() {}
}

export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;
  constructor( public uid: string, public user: User | null ) {}
}

export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor( ) {}
}

export class InitError implements Action {
  readonly type = Types.INIT_ERROR;
  constructor( public error:string ) {}
}

// Sign in
export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) {}
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
  constructor(public uid: string, public user: User | null) {}
}

export class SignInEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_ERROR;
  constructor(public error: string) {}
}

// Sign up
export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) {}
}

export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
  constructor(public uid: string) {}
}

export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_UP_EMAIL_ERROR;
  constructor(public error: string) {}
}


// Sign out
export class SignOutEmail implements Action {
  readonly type = Types.SIGN_OUT_EMAIL;
  constructor() {}
}

export class SignOutEmailSuccess implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_SUCCESS;
  constructor() {}
}

export class SignOutEmailError implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_ERROR;
  constructor(public error: string) {}
}

export type All = Init |
                  InitAuthorized |
                  InitUnauthorized |
                  InitError |
                  SignInEmail |
                  SignInEmailSuccess |
                  SignInEmailError |
                  SignUpEmail |
                  SignUpEmailSuccess |
                  SignUpEmailError |
                  SignOutEmail |
                  SignOutEmailSuccess |
                  SignOutEmailError;
