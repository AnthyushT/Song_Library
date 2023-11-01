import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SongInfo } from 'src/models/songs.model';
import { songsAlbum as importedSongsAlbum } from 'src/assets/songs';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  
  addSongFormData! : FormGroup ;
  songsAlbum = [...importedSongsAlbum]; // Create a new variable and copy the imported songs into it

  constructor(private matDialogRef: MatDialogRef<AddSongComponent>,
    @Inject(MAT_DIALOG_DATA) data:SongInfo,
    private fb : FormBuilder
    ){}

  closeForm(){
    this.matDialogRef.close()
  }

  addInForm(){
    let songData = this.addSongFormData.value;
    songData.id = this.generateUUID();

    // Check for duplicates
    let duplicateSong = this.songsAlbum.find(song => song.id === songData.id);
    if (!duplicateSong) {
      this.songsAlbum.push(songData);
      // Store songsAlbum in localStorage
      localStorage.setItem('songsAlbum', JSON.stringify(this.songsAlbum));
      this.matDialogRef.close(songData);
      alert('Song added successfully!')
    } else {
      alert('Song already exists!')
    }
  }

  ngOnInit(): void {
    // Load songsAlbum from localStorage
    let storedSongs = localStorage.getItem('songsAlbum');
    if (storedSongs) {
      this.songsAlbum = JSON.parse(storedSongs);
    }

    this.addSongFormData = this.fb.group({
      songName : "",
      artistName : "",
      numberOfStreams : "",
      releaseYear : "",
      durationInSeconds : "",
    })
  }

  generateUUID() { 
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;
      if(d > 0){
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
