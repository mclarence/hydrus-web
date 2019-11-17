import { AppComponent } from './../app.component';
import { HydrusApiService } from './../hydrus-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { ngxLocalStorage } from 'ngx-localstorage';
import { environment } from 'src/environments/environment';
import { SearchService } from '../search.service';
import { HydrusFilesService } from '../hydrus-files.service';
import { IPageInfo } from 'ngx-virtual-scroller';
import { HydrusFile } from '../hydrus-file';
import { PhotoswipeComponent } from '../photoswipe/photoswipe.component';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  @ngxLocalStorage({prefix: environment.localStoragePrefix})
  hydrusApiUrl: string;

  @ngxLocalStorage({prefix: environment.localStoragePrefix})
  hydrusApiKey: string;


  constructor(private searchService: SearchService, private apiService: HydrusApiService, public filesService: HydrusFilesService) { }

  currentSearchIDs: number[] = [];
  //currentFiles: HydrusFile[] = [];
  searchTags: string[] = [];

  searchArchive: boolean = false;

  //loading: boolean = false;

  //loadAtOnce: number = 100;

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(this.hydrusApiUrl && this.hydrusApiKey) {
      this.search();
    }
  }

  tagsChanged(tags: string[]) {
    this.searchTags = tags;
    this.search();
  }

  search() {
    this.searchService.searchFiles(this.searchTags).subscribe((result) => {
      //this.currentFiles = [];
      this.currentSearchIDs = result;
      //this.fetchMore();
    }, (error) => {

    })
  }




  //public scrollTrackByFunction(index: number, file: HydrusFile): number {
 //   return file.file_id;
 // }





}
