import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Screen1Component } from './screen1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Screen1RoutingModule } from './screen1-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [Screen1Component],
  imports: [
    CommonModule,
    Screen1RoutingModule,
    MatTableExporterModule,
    MaterialModule,
    ChartsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class Screen1Module { }
