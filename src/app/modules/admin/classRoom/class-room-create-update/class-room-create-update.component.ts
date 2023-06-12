import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, distinctUntilChanged, debounceTime } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { ClassRoom } from 'src/app/features/models/class-room.model';
import { State } from 'src/app/features/models/state.model';
import { ClassRoomService } from 'src/app/features/services/class-room.service';

@Component({
  selector: 'app-class-room-create-update',
  templateUrl: './class-room-create-update.component.html',
  styleUrls: ['./class-room-create-update.component.scss']
})
export class ClassRoomCreateUpdateComponent  implements OnInit {
  jsonUrl = "assets/data/classRoom.data.json";

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  classRoom: ClassRoom;

  classRoomId: number;
  classRoomForm: FormGroup;
  classRoomFormValue: any;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["name", "state", "action"];
  dataSource = new MatTableDataSource<ClassRoom>();
  selection = new SelectionModel<ClassRoom>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public classRoomService: ClassRoomService,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.classRoomForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: () => {
        let obj = { data: this.classRoomForm.getRawValue(), errors: this.errors };
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<ClassRoom>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.classRoomId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.classRoomId;
    this.classRoomForm = this.form;
    this.classRoomForm.patchValue({ id: this.classRoomId });
    this.getClassRoomDetail(this.classRoomId);
  }

  getClassRoomDetail(classRoomId: any) {
    if (!this.classRoomId) return;
    this.classRoomService.getClassRoomDetail(classRoomId).subscribe({
      next: (res: any) => {
        if (res) {
          this.classRoom = res.data;
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
      // userId: [1],
      name: ["", [Validators.required, Validators.maxLength(20)]],
      number: ["", [Validators.required, Validators.maxLength(20)]],
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.classRoomForm.patchValue({
        id: user.id,
        // userId: 1,//user.userId,
        name: user.name,
        number: user.number,
      });
    }
  }


  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.classRoomForm);
    if (this.classRoomForm.invalid) {
      this.classRoomForm.markAllAsTouched();
      return;
    }
    this.classRoomFormValue = this.classRoomForm.getRawValue();
    this.formData = FormExtension.toFormData(this.classRoomForm);
    console.log("save", this.classRoomFormValue);

    if (this.classRoomFormValue.id > 0) {

      this.classRoomService.updateClassRoomDetail(this.classRoomFormValue.id, this.formData).subscribe({
        next: () => {
          // this.messageService.success(this.message.updateSuccess);
          this.messageService.toastSuccess(this.message.updateSuccess);
          this.router.navigate(['admin/classRoom']);
        },
      });
    } else {
      this.classRoomService.addClassRoomDetail(this.formData).subscribe({
        next: () => {
          this.messageService.toastSuccess(this.message.saveSucess);
          this.router.navigate(['admin/classRoom']);
        },
      });
    }
  }

  reset(): void {
    this.classRoomForm.reset(this.form.value);
  }

  clear(): void {
    this.classRoomForm.reset();
    this.classRoomForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.classRoomForm);
  }

}
