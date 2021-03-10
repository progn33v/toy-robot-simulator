import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SimulatorRoutingModule } from './simulator-routing.module';
import { SimulatorComponent } from './simulator-component/simulator.component';
import { NotifyService } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  declarations: [SimulatorComponent],
  providers: [NotifyService],
})
export class SimulatorModule {}
