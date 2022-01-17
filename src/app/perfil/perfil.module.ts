import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

const PerfilRouting: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
  }
];

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PerfilRouting)
  ]
})
export class PerfilModule { }
