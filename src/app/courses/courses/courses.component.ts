import { ErroDialogComponent } from './../../shared/components/erro-dialog/erro-dialog.component';
import { Component,OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';
import {catchError} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent  {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(private CoursesService: CoursesService,
    public dialog: MatDialog){

    this.courses$ = this.CoursesService.list()
    .pipe(
      catchError(erro => {
        this.onError('Erro ao carregar.');
        return of([])
      })
    );
    }

    onError(errorMsg: string) {
      this.dialog.open(ErroDialogComponent, {
        data: errorMsg
      });
    }

  ngOnInit(): void{


  }
}
