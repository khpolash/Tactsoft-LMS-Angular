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
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Category } from 'src/app/features/models/category.model';
import { CategoryService } from 'src/app/features/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-create-update',
  templateUrl: './category-create-update.component.html',
  styleUrls: ['./category-create-update.component.scss']
})
export class CategoryCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/category.data.json";
  message = Messages;
  errors: any;
  formData: any;

  categoryId: number;
  categoryForm: FormGroup;
  categoryFormValue: any;
  isEdit = false;
  picture: any;
  avaterPreview: any;
  category: Category;

  // public uploader: FileUploader;
  uploadUrl: string;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  // displayedColumns: string[] = ["picture", "name", "phone", "email", "genderId", "action"];
  dataSource = new MatTableDataSource<Category>();
  selection = new SelectionModel<Category>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public categoryService: CategoryService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.categoryForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = { data: this.categoryForm.getRawValue(), errors: this.errors };
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Category>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.categoryId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.categoryId;
    this.categoryForm = this.form;
    this.categoryForm.patchValue({ id: this.categoryId });
    this.getCategoryDetail(this.categoryId);
    // this.uploader = new FileUploader({});
  }

  getCategoryDetail(categoryId: any) {
    if (!this.categoryId) return;
    this.categoryService.getCategoryDetail(categoryId).subscribe({
      next: (res: any) => {
        if (res) {
          this.category = res.data;
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
      code: ["", [Validators.required]],
      description: [""],
      isActive: [true],
      picture: [null],
      pictureFile: []
    });
  }

  set form(data: any) {
    if (data !== null) {
      this.categoryForm.patchValue({
        id: data.id,
        name: data.name,
        code: data.code,
        description: data.description,
        isActive: data.isActive,
        picture: data.picture
      });

      this.avaterPreview = data.picture ? `${environment.baseUrl}/${data.picture}` : "";
      this.picture = data.picture;
      console.log("path avater", this.picture);
      console.log("path", data, this.categoryForm.getRawValue());
    }
  }


  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.categoryForm);
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.categoryFormValue = this.categoryForm.getRawValue();
    console.log("save avater", this.picture);
    this.categoryForm.patchValue({ picture: this.picture });
    this.formData = FormExtension.toFormData(this.categoryForm);
    console.log("save", this.categoryFormValue);

    debugger;
    if (this.categoryFormValue.id > 0) {

      this.categoryService.updateCategoryDetail(this.categoryFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.updateSuccess);
          this.router.navigate(['admin/category']);
        },
      });
    } else {
      this.categoryService.addCategoryDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.toastSuccess(this.message.saveSucess);
          this.router.navigate(['admin/category']);
        },
      });
    }
  }

  reset(): void {
    this.categoryForm.reset(this.form.value);
  }

  clearCategory(): void {
    this.categoryForm.reset();
    this.categoryForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.categoryForm);
  }

  uploadFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    this.categoryForm.get("image")?.updateValueAndValidity();
    // this.cd.markForCheck();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.categoryForm.patchValue({
          pictureFile: file,
        });
        this.picture = file;
        this.avaterPreview = reader.result as string;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }

    console.log(this.categoryForm);
    // reader.readAsDataURL(file)
  }
}
