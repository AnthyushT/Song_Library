import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { songsAlbum } from 'src/assets/songs';
import { Songs, SongInfo } from 'src/models/songs.model';
import { SongService } from 'src/shared/services/song.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSongComponent } from 'src/shared/component/add-song/add-song.component'
import { DeleteSongComponent } from 'src/shared/component/delete-song/delete-song.component'

export interface Data {
  songName: string;
  artistName: string;
  numberOfStreams: number;
  releaseYear: number;
  durationInSeconds: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'songslib';
  albumSongs: Array<Songs> = []; // Array to hold songs in the album
  entireAlbum: Array<Songs> = []; // Array to hold all songs
  buttonDisabled = true;
  pageNumber: number = 0; // Current page number
  pageSize: number = 5; //Number of items per page
  filteringAlbum: Array<Songs> = []; // Array to hold filtered songs 
  selectedAlbum: Songs[] = []; //Array to hold selected songs
  listOfColumns = {
    'songName': "none",
    'artistName': "none",
    'numberOfStreams': "none",
    'releaseYear': "none",
    'durationInSeconds': "none",
  }

  constructor(public _songService: SongService, private dialog: MatDialog) {
    this.entireAlbum = _songService.songsList;
  }
  newForm: FormGroup = new FormGroup({
    songName: new FormControl(''),
    artistName: new FormControl(''),
  })

  @Output() page = new EventEmitter<any>;

  ngOnInit(): void {
    this.filteringAlbum = this.entireAlbum;
    this.newForm.valueChanges.subscribe(songs => {
      console.log(songs);
      this.pageNumber = 0;
      this.pageSize = 5;
      this.filteringAlbum = this._songService.getFilteredSongs({ songName: songs.songName, artistName: songs.artistName });
      this.displaySongs()
    })
    this.displaySongs()
  }

  displaySongs() {
    this.albumSongs = [];
    console.log(this.pageNumber)
    console.log(this.pageSize)
    for (let i = (this.pageNumber * this.pageSize); i < (this.pageNumber + 1) * this.pageSize && i < this.filteringAlbum.length; i++) {
      this.albumSongs.push(this.filteringAlbum[i]);
    }
    console.log(this.albumSongs);
  }

  checkBoxLimit(song: Songs) {
    if (this.selectedAlbum.find(songVer => songVer.id === song.id)) {
      this.selectedAlbum = this.selectedAlbum.filter(songVer => songVer.id !== song.id)
    }
    else {
      this.selectedAlbum.push(song);
    }
    if (this.selectedAlbum.length > 5 || this.selectedAlbum.length <= 0) {
      this.buttonDisabled = true;
    }
    else {
      this.buttonDisabled = false;
    }
  }

  orderingRows(column: string, order: string) {
    this.filteringAlbum = this._songService.getSortedData({ songNameFilter: this.newForm.value['songName'], artistNameFilter: this.newForm.value['artistName'], column: column, order: order })
    this.displaySongs()
  }

  pageChange(e: any) {
    console.log(e);
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.displaySongs()
  }

  openAddFunctionality() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "800px";
    dialogConfig.height = "300px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    this.dialog.open(AddSongComponent, dialogConfig)
    const dialogRef = this.dialog.open(AddSongComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)
        if (data !== undefined) {
          this._songService.addSong(data)
        }
      }
    );
  }

  openDeleteFunctionality() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "800px";
    dialogConfig.height = "300px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.data = {
      deletedSongs: this.selectedAlbum,
    }
    this.dialog.open(DeleteSongComponent, dialogConfig)
    const dialogRef = this.dialog.open(DeleteSongComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)
        if (data === true) {
          this._songService.removeSongs(this.selectedAlbum)
        }
        this.selectedAlbum = [];
      }
    );
  }

  
}
