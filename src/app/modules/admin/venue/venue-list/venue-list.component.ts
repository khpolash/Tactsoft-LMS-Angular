import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, pipe, share, debounceTime, distinctUntilChanged, startWith, switchMap, map, merge } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { RouteService } from 'src/app/core/services/routes/route.service';
import { FrontRoute } from 'src/app/features/configs/front-route';
import { Venue } from 'src/app/features/models/venue.model';
import { VenueService } from 'src/app/features/services/venue.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {

  frontRoute = FrontRoute;
  userId: number;

  venue: Venue[];
  venues: Venue[];

  displayedColumns: string[] = ["position","name","contactNo","action"];
  dataSource: MatTableDataSource<Venue> = new MatTableDataSource();
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageIndex = 0;
  pageSize = 10;
  length = 0;

  selection = new SelectionModel<Venue>(true, []);
  filterInput: Subject<string> = new Subject<string>();
  filterValue: string = "";

  isLoadingResults = true;
  message = Messages;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    public dialog: MatDialog,
    public venueService: VenueService,
    public routeService: RouteService,
    private messageService: MessageService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }

  customPipe = pipe(
    share(),
    debounceTime(1000),
    distinctUntilChanged(),
    startWith({}),
    switchMap(() => {
      this.isLoadingResults = true;
      return this.load();
    }),

    map((data: any) => {
      this.isLoadingResults = false;

      if (data === null) {
        return [];
      }

      return data;
    })
  );

  customSubscribe = (data: any) => {
    this.venue = data.data.data;
    this.dataSource = new MatTableDataSource(data.data.data);
    this.paginator.pageIndex = data.data.pageIndex;
    this.paginator.length = data.data.total;
  };

  load(): any {
    return this.venueService.getSearch(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.filterValue
    );
  }

  getData(): void {
    merge(this.sort.sortChange, this.paginator.page, this.filterInput)
      .pipe(this.customPipe)
      .subscribe((data: any) => {
        this.customSubscribe(data);
      });
  }

  reload(reloadType: boolean): void {
    if (reloadType) {
      this.paginator.pageIndex = 0;
      this.filterValue = "";
    }

    this.getData();
  }
  pageChanged(event: PageEvent) {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
  }

  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    if (this.filterInput.observers.length === 0) {
      this.filterInput.pipe(debounceTime(1000), distinctUntilChanged());
    }

    this.filterInput.next(value);
    this.filterInput.subscribe((e) => (this.filterValue = e));

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  remove(venueId: number): void {
    if (venueId) {
      this.messageService.confirm().then((result) => {
        if (result.value) {
          this.venueService.delete(venueId).subscribe((e) => {
            this.messageService.success(this.message.deleteSuccess);
            this.reload(true);
          });
        }
      });
    }
  }


}
