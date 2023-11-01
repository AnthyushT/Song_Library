import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Songs } from 'src/models/songs.model';
@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent {
  deletedSongs:Songs[] = []
  constructor(public dialogRef: MatDialogRef<DeleteSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
      this.deletedSongs = this.data.deletedSongs
      console.log(this.deletedSongs)
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteSongs(){
    this.dialogRef.close("true");
  }
}
