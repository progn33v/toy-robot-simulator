import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimulatorComponent } from './simulator-component/simulator.component';

const routes: Routes = [
  {
    path: '',
    component: SimulatorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulatorRoutingModule {}
