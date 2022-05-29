import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regex, regexErrors, markFormGroupTouched } from '@app/shared/utils';
import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
  form!: FormGroup;
  isInline: boolean = true;
  showSpinner: boolean = false;
  regexError = regexErrors;
  items: ControlItem[];

  constructor(private fb: FormBuilder,
    private notification: NotificationService) {

    this.items = [
      { label: 'uno', value: 1 },
      { label: 'dos', value: 2 },
      { label: 'tres', value: 3 },
      { label: 'cuatro', value: 4 },
      { label: 'cinco', value: 5 },
      { label: 'seis', value: 6 },
    ];

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(regex.number),
          ],
        },
      ],
      password: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      autocomplete: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      select: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      checkboxes: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      radios: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      date: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      dateRange: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: '46654',
      password: '123321',
      autocomplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2022, 5, 10).getTime(),
        to: new Date(2022, 5, 11).getTime(),
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
    } else {
      console.log('presiono');
    }
  }

  organizarElemento(): void {
    this.isInline = !this.isInline;
  }

  onToggleDisable(): void {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onError(): void {
    this.notification.error('Se encontraron errores en el proceso');
  }

  onSuccess(): void {
    this.notification.success('El procedimiento fue exitoso');
  }
}
