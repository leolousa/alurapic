import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PhotoService } from './../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;
  commentForm: FormGroup;

  constructor(
    private photoServive: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoServive.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['',
        [
          Validators.required,
          Validators.maxLength(300)
        ]
      ]
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;
    this.comments$ = this.photoServive
        .addComment(this.photoId, comment)
        .pipe(switchMap(() => this.photoServive.getComments(this.photoId)))
        .pipe(tap(() => {
          this.commentForm.reset();
        }));
  }
}
