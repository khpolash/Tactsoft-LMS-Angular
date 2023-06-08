import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { AllEvent } from 'src/app/features/models/allEvent.model';
import { AllEventService } from 'src/app/features/services/all-event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-event-create-update',
  templateUrl: './all-event-create-update.component.html',
  styleUrls: ['./all-event-create-update.component.scss']
})
export class AllEventCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/allEvent.data.json";
  message = Messages;
  errors: any;
  formData: any;

  allEventId: number;
  allEventForm: FormGroup;
  allEventFormValue: any;
  isEdit = false;
  picture: any;
  avaterPreview: any;
  allEvent: AllEvent;

  // public uploader: FileUploader;
  uploadUrl: string;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  dataSource = new MatTableDataSource<AllEvent>();
  selection = new SelectionModel<AllEvent>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public allEventService: AllEventService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.allEventForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = { data: this.allEventForm.getRawValue(), errors: this.errors };
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<AllEvent>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.allEventId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.allEventId;
    this.allEventForm = this.form;
    this.allEventForm.patchValue({ id: this.allEventId });
    this.getAllEventDetail(this.allEventId);
  }

  getAllEventDetail(allEventId: any) {
    if (!this.allEventId) return;
    this.allEventService.getAllEventDetail(allEventId).subscribe({
      next: (res: any) => {
        if (res) {
          this.allEvent = res.data;
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
      name: ["", [Validators.required, Validators.maxLength(50)]],
      isActive: [true],
      description:["", [Validators.required, Validators.minLength(150), Validators.maxLength(200)]],
      picture: [""],
      pictureFile: []
    });
  }

  set form(data: any) {
    if (data !== null) {
      this.allEventForm.patchValue({
        id: data.id,
        name: data.name,
        description:data.description,
        isActive: data.isActive,
        picture: data.picture
      });

      this.avaterPreview = data.picture ? `${environment.baseUrl}/${data.picture}` : "";
      this.picture = data.picture;
      console.log("path avater", this.picture);
      console.log("path", data, this.allEventForm.getRawValue());
    }
  }


  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.allEventForm);
    if (this.allEventForm.invalid) {
      this.allEventForm.markAllAsTouched();
      return;
    }

    this.allEventFormValue = this.allEventForm.getRawValue();
    console.log("save avater", this.picture);
    this.allEventForm.patchValue({ picture: this.picture });
    this.formData = FormExtension.toFormData(this.allEventForm);
    console.log("save", this.allEventFormValue);

    debugger;
    if (this.allEventFormValue.id > 0) {

      this.allEventService.updateAllEventDetail(this.allEventFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.updateSuccess);
          this.router.navigate(['admin/allEvent']);
        },
      });
    } else {
      this.allEventService.addAllEventDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.saveSucess);
          this.router.navigate(['admin/allEvent']);
        },
      });
    }
  }

  reset(): void {
    this.allEventForm.reset(this.form.value);
  }

  clear(): void {
    this.allEventForm.reset();
    this.allEventForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.allEventForm);
  }

  uploadFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    this.allEventForm.get("image")?.updateValueAndValidity();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.allEventForm.patchValue({
          pictureFile: file,
        });
        this.picture = file;
        this.avaterPreview = reader.result as string;
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }
    console.log(this.allEventForm);
  }
}
