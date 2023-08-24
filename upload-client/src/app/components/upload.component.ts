import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { UploadService } from '../upload.service';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{

  @ViewChild('audio')
  audio!: ElementRef

  audioFile = ""

  uploadSvc = inject(UploadService)
  router = inject(Router)

  ngOnInit(): void { }

  process(){
    const file = this.audio.nativeElement.files[0] as File
    this.audioFile = file.name

    this.uploadSvc.upload(file)
      .then(result => {
        // { id: 1234 }
        const id = result['id']
        const queryParams: Params = {
          name: file.name
        }
        this.router.navigate(["/play", id], { queryParams })
      })
  }

}
