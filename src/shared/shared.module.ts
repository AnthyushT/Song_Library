import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from './component/add-song/add-song.component';
import { DeleteSongComponent } from './component/delete-song/delete-song.component';
import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/material/material.module';
//import { SongData } from 'src/models/song.model';





@NgModule({
  declarations: [

  
    AddSongComponent,
        DeleteSongComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
