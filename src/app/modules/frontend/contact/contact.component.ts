import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormExtension } from 'src/app/core/form/form-extension';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { ClientMessageService } from 'src/app/features/services/client-message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  clientMessageForm: FormGroup;
  errors: any;
  clientMessageFormValue: any;
  formData: any;
  message = Messages;
  router: any;

  constructor(
    public fb: FormBuilder,
    private clientMessageService:ClientMessageService,
    private messageService: MessageService
    ){}

  ngOnInit(): void {
    this.clientMessageForm = this.form;
  }

  get form(): any {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.clientMessageForm);
    if (this.clientMessageForm.invalid) {
      this.clientMessageForm.markAllAsTouched();
      return;
    }

    this.clientMessageFormValue = this.clientMessageForm.getRawValue();
    this.formData = FormExtension.toFormData(this.clientMessageForm);
    console.log('save', this.clientMessageFormValue);

    this.clientMessageService.addClientMessageDetail(this.formData).subscribe({
      next: () => {
        this.messageService.toastSuccess(this.message.sendSucess);
        window.location.reload();
      },
    });
  }

  reset(): void {
    this.clientMessageForm.reset(this.form.value);
  }

  clear(): void {
    this.clientMessageForm.reset();
    this.clientMessageForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.clientMessageForm);
  }
}
