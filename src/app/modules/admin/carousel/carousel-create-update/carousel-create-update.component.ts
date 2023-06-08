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
import { Carousel } from 'src/app/features/models/carousel.model';
import { CarouselService } from 'src/app/features/services/carousel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel-create-update',
  templateUrl: './carousel-create-update.component.html',
  styleUrls: ['./carousel-create-update.component.scss']
})
export class CarouselCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/carousel.data.json";
  message = Messages;
  errors: any;
  formData: any;

  carouselId: number;
  carouselForm: FormGroup;
  carouselFormValue: any;
  isEdit = false;
  picture: any;
  avaterPreview: any;
  carousel: Carousel;

  // public uploader: FileUploader;
  uploadUrl: string;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  dataSource = new MatTableDataSource<Carousel>();
  selection = new SelectionModel<Carousel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public carouselService: CarouselService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.carouselForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = { data: this.carouselForm.getRawValue(), errors: this.errors };
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Carousel>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.carouselId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.carouselId;
    this.carouselForm = this.form;
    this.carouselForm.patchValue({ id: this.carouselId });
    this.getCarouselDetail(this.carouselId);
  }

  getCarouselDetail(carouselId: any) {
    if (!this.carouselId) return;
    this.carouselService.getCarouselDetail(carouselId).subscribe({
      next: (res: any) => {
        if (res) {
          this.carousel = res.data;
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
      isActive: [true],
      picture: [""],
      pictureFile: []
    });
  }

  set form(data: any) {
    if (data !== null) {
      this.carouselForm.patchValue({
        id: data.id,
        name: data.name,
        isActive: data.isActive,
        picture: data.picture
      });

      this.avaterPreview = data.picture ? `${environment.baseUrl}/${data.picture}` : "";
      this.picture = data.picture;
      console.log("path avater", this.picture);
      console.log("path", data, this.carouselForm.getRawValue());
    }
  }


  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.carouselForm);
    if (this.carouselForm.invalid) {
      this.carouselForm.markAllAsTouched();
      return;
    }

    this.carouselFormValue = this.carouselForm.getRawValue();
    console.log("save avater", this.picture);
    this.carouselForm.patchValue({ picture: this.picture });
    this.formData = FormExtension.toFormData(this.carouselForm);
    console.log("save", this.carouselFormValue);

    debugger;
    if (this.carouselFormValue.id > 0) {

      this.carouselService.updateCarouselDetail(this.carouselFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.updateSuccess);
          this.router.navigate(['admin/carousel']);
        },
      });
    } else {
      this.carouselService.addCarouselDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.saveSucess);
          this.router.navigate(['admin/carousel']);
        },
      });
    }
  }

  reset(): void {
    this.carouselForm.reset(this.form.value);
  }

  clear(): void {
    this.carouselForm.reset();
    this.carouselForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.carouselForm);
  }

  uploadFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    this.carouselForm.get("image")?.updateValueAndValidity();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.carouselForm.patchValue({
          pictureFile: file,
        });
        this.picture = file;
        this.avaterPreview = reader.result as string;
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }
    console.log(this.carouselForm);
  }
}
