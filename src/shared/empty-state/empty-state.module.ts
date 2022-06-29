import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../modules/material.module';
import { EmptyStateComponent } from './empty-state.component';


@NgModule({
  declarations: [
    EmptyStateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    EmptyStateComponent,
  ],
})
export class EmptyStateModule { }
