import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { regex, regexErrors, markFormGroupTouched } from '@app/shared/utils';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Observable } from 'rxjs';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loading$!: Observable<boolean | null | undefined>;
  form!: UntypedFormGroup;
  regexErrors = regexErrors;

  constructor(private fb: UntypedFormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));
    this.form = this.fb.group({
      email: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      password: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password,
      };
      this.store.dispatch(new fromUser.SignInEmail(credentials));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
