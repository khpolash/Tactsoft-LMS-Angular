import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Trainer } from 'src/app/features/models/trainer.model';
import { TrainerService } from 'src/app/features/services/trainer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trainer-create-update',
  templateUrl: './trainer-create-update.component.html',
  styleUrls: ['./trainer-create-update.component.scss']
})
export class TrainerCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/trainer.data.json";
  message = Messages;
  errors: any;
  formData: any;

  trainerId: number;
  trainerForm: FormGroup;
  trainerFormValue: any;
  isEdit = false;
  picture: any;
  curriculumVitae:any;
  avaterPreview: any;
  trainer: Trainer;

  today = new Date();

  // selected =[];

  toppingList: string[] = [
    'Asp.Net',
    'Java',
    'Php',
    'Sql Server',
    'My Sql',
    'MongoDB',
    'Angular',
    'React',
    'Vue',
    'Express',
    'Node',
  ];

  // public uploader: FileUploader;
  uploadUrl: string;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  // displayedColumns: string[] = ["picture", "name", "phone", "email", "genderId", "action"];

  dataSource = new MatTableDataSource<Trainer>();
  selection = new SelectionModel<Trainer>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public trainerService: TrainerService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.trainerForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = { data: this.trainerForm.getRawValue(), errors: this.errors };
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Trainer>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.trainerId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.trainerId;
    this.trainerForm = this.form;
    this.trainerForm.patchValue({ id: this.trainerId });
    this.getTrainerDetail(this.trainerId);
    // this.uploader = new FileUploader({});
  }

  getTrainerDetail(trainerId: any) {
    if (!this.trainerId) return;
    this.trainerService.getTrainerDetail(trainerId).subscribe({
      next: (res: any) => {
        if (res) {
          this.trainer = res.data;
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
      name: ["", [Validators.required, Validators.maxLength(20)]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: [""],
      joiningDate: [""],
      address: [""],
      academicInfo: [""],
      experience: [""],
      expertise: [[]],
      about: [""],
      facebookLink: [""],
      twitterLink: [""],
      linkedinLink: [""],
      curriculumVitae:[null],
      curriculumVitaeFile:[],
      picture: [null],
      pictureFile: []
    });
  }

  set form(data: any) {
    if (data !== null) {
      this.trainerForm.patchValue({
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        about: data.about,
        dateOfBirth: data.dateOfBirth,
        joiningDate: data.joiningDate,
        academicInfo: data.academicInfo,
        experience: data.experience,
        address: data.address,
        expertise: data.expertise,
        facebookLink: data.facebookLink,
        twitterLink: data.twitterLink,
        linkedinLink: data.linkedinLink,
        picture: data.picture,
        curriculumVitae: data.curriculumVitae
      });
      // this.selected = [data.expertise];

      // console.log(this.selected);

      this.avaterPreview = data.picture ? `${environment.baseUrl}/${data.picture}` : "";
      this.picture = data.picture;
      // this.curriculumVitae = data.curriculumVitae;
      console.log("path avater", this.picture);
      console.log("path", data, this.trainerForm.getRawValue());
    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }


  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.trainerForm);
    if (this.trainerForm.invalid) {
      this.trainerForm.markAllAsTouched();
      return;
    }

    this.trainerFormValue = this.trainerForm.getRawValue();
    console.log("save avater", this.picture);
    this.trainerForm.patchValue({ picture: this.picture });
    this.formData = FormExtension.toFormData(this.trainerForm);
    console.log("save", this.trainerFormValue);

    debugger;
    if (this.trainerFormValue.id > 0) {

      this.trainerService.updateTrainerDetail(this.trainerFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.updateSuccess);
          this.router.navigate(['admin/trainer']);
        },
      });
    } else {
      this.trainerService.addTrainerDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.saveSucess);
          this.router.navigate(['admin/trainer']);
        },
      });
    }
  }

  reset(): void {
    this.trainerForm.reset(this.form.value);
  }

  clearTrainer(): void {
    this.trainerForm.reset();
    this.trainerForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.trainerForm);
  }

  uploadFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    this.trainerForm.get("image")?.updateValueAndValidity();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.trainerForm.patchValue({
          pictureFile: file,
        });
        this.picture = file;
        this.avaterPreview = reader.result as string;
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }
    console.log(this.trainerForm);
  }

  uploadCVFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    // this.trainerForm.get("image")?.updateValueAndValidity();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.trainerForm.patchValue({
          curriculumVitaeFile:file
        });
        this.curriculumVitae = file;
        // document.querySelector("iframe").src = file;
        // this.avaterPreview = reader.result as string;
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }
    console.log(this.trainerForm);
  }
}
