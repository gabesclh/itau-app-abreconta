import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil.component';

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
    NgxMaskModule.forRoot(),
    RouterModule.forChild(PerfilRouting)
  ]
})
export class PerfilModule { }
