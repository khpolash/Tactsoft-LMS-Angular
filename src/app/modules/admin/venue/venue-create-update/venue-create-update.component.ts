import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormExtension } from 'src/app/core/form/form-extension';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Venue } from 'src/app/features/models/venue.model';
import { VenueService } from 'src/app/features/services/venue.service';

@Component({
  selector: 'app-venue-create-update',
  templateUrl: './venue-create-update.component.html',
  styleUrls: ['./venue-create-update.component.scss'],
})
export class VenueCreateUpdateComponent implements OnInit {
  message = Messages;
  errors: any;
  formData: any;

  isEdit = false;

  venue: Venue;

  venueId: number;
  venueForm: FormGroup;
  venueFormValue: any;

  @ViewChild('lableInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ['name', 'code', 'currency', 'flag', 'action'];
  dataSource = new MatTableDataSource<Venue>();
  selection = new SelectionModel<Venue>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public venueService: VenueService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => (this.venueId = params['id'] ? Number(params['id']) : 0)
    );
    this.isEdit = !!this.venueId;
    this.venueForm = this.form;
    this.venueForm.patchValue({ id: this.venueId });
    this.getVenueDetail(this.venueId);
  }

  getVenueDetail(venueId: any) {
    if (!this.venueId) return;
    this.venueService.getVenueDetail(venueId).subscribe({
      next: (res: any) => {
        if (res) {
          this.venue = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  get form(): any {
    return this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
    });
  }

  set form(data: any) {
    if (data !== null) {
      this.venueForm.patchValue({
        id: data.id,
        name: data.name,
        address: data.address,
        contactNo: data.contactNo,
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.venueForm);
    if (this.venueForm.invalid) {
      this.venueForm.markAllAsTouched();
      return;
    }

    this.venueFormValue = this.venueForm.getRawValue();
    this.formData = FormExtension.toFormData(this.venueForm);
    console.log('save', this.venueFormValue);

    if (this.venueFormValue.id > 0) {
      this.venueService
        .updateVenueDetail(this.venueFormValue.id, this.formData)
        .subscribe({
          next: () => {
            this.messageService.toastSuccess(this.message.updateSuccess);
            this.router.navigate(['admin/venue']);
          },
        });
    } else {
      this.venueService.addVenueDetail(this.formData).subscribe({
        next: () => {
          this.messageService.toastSuccess(this.message.saveSucess);
          this.router.navigate(['admin/venue']);
        },
      });
    }
  }

  reset(): void {
    this.venueForm.reset(this.form.value);
  }

  clearState(): void {
    this.venueForm.reset();
    this.venueForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.venueForm);
  }
}
