import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormExtension } from 'src/app/core/form/form-extension';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Country } from 'src/app/features/models/country.model';
import { CountryService } from 'src/app/features/services/country.service';

@Component({
  selector: 'app-country-creat-update',
  templateUrl: './country-create-update.component.html',
  styleUrls: ['./country-create-update.component.scss']
})

export class CountryCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  isEdit = false;

  country: Country;

  countryId:number;
  countryForm:FormGroup;
  countryFormValue:any;


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["name","code","currency","flag","action"];
  dataSource = new MatTableDataSource<Country>();
  selection = new SelectionModel<Country>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public countryService: CountryService,
    private messageService: MessageService,
    ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.countryId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.countryId;
    this.countryForm = this.form;
    this.countryForm.patchValue({id: this.countryId});
    this.getCountryDetail(this.countryId);
  }

  getCountryDetail(countryId: any) {
    if (!this.countryId) return;
    this.countryService.getCountryDetail(countryId).subscribe({
      next: (res: any) => {
        if (res) {
          this.country = res.data;
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
      name:["",[Validators.required, Validators.maxLength(50)]],
      code:["",[Validators.required]],
      currency:["",[Validators.required]],
      flag:[""],
    });
  }

  set form(data: any) {
    if (data !== null) {
      this.countryForm.patchValue({
        id: data.id,
        name:data.name,
        code:data.code,
        currency:data.currency,
        flag:data.flag,
      });
    }
  }


  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.countryForm);
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    }

    this.countryFormValue = this.countryForm.getRawValue();
    this.formData = FormExtension.toFormData(this.countryForm);
    console.log("save", this.countryFormValue);

    if (this.countryFormValue.id > 0) {

      this.countryService.updateCountryDetail(this.countryFormValue.id, this.formData).subscribe({
        next: () => {
          this.messageService.toastSuccess(this.message.updateSuccess);
          this.router.navigate(['admin/country']);
        },
      });
    } else {
      this.countryService.addCountryDetail(this.formData).subscribe({
        next: () => {
          this.messageService.toastSuccess(this.message.saveSucess);
          this.router.navigate(['admin/country']);
        },
      });
    }
  }

  reset(): void {
    this.countryForm.reset(this.form.value);
  }

  clearState(): void {
    this.countryForm.reset();
    this.countryForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.countryForm);
  }

}
