import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../modules/material.module';
import { LoaderComponent } from './loader.component';


@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    LoaderComponent,
  ],
})
export class LoaderModule { }
