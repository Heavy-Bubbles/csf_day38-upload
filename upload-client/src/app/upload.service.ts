import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  http = inject(HttpClient)

  upload(file: File){

    const form = new FormData()
    form.set("audio", file)

    return firstValueFrom(
      this.http.post<any>('/audio', form)
    )

  }

  getUrl(songId: string){
    return firstValueFrom(
      this.http.get<any>('/audio/${songId}')
    )
  }
}
