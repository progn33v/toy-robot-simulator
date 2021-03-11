import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SimulatorComponent } from './simulator.component';
import { SimulatorModule } from '../simulator.module';
import { NotifyService, Rotations } from "@app/shared";

describe('SimulatorComponent', () => {
  let component: SimulatorComponent;
  let fixture: ComponentFixture<SimulatorComponent>;
  let notifyServiceStub: Partial<NotifyService>;

  function placeToyCommand(x: number, y: number, direction: string) {
    const xPositionCommand = component.form.controls.x_position;
    xPositionCommand.setValue(x);
    const yPositionCommand = component.form.controls.y_position;
    yPositionCommand.setValue(y);
    const directionCommand = component.form.controls.direction;
    directionCommand.setValue(direction);
    component.placeToy();
  }

  beforeEach((() => {
    notifyServiceStub = {};
    TestBed.configureTestingModule({
      imports: [
        SimulatorModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [{provide: NotifyService, useValue: notifyServiceStub}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('created a simulator component.', () => {
    expect(component).toBeTruthy();
  });

  describe('Executing command test-cases', () => {
    it('Executed place command', () => {
      placeToyCommand(1, 1, 'NORTH');
      expect(component.x).toEqual(1);
      expect(component.y).toEqual(1);
      expect(component.direction).toEqual('NORTH');
    });

    it('Executed invalid place command', () => {
      placeToyCommand(null, null, null);
      expect(component.x).toBeNull();
      expect(component.y).toBeNull();
      expect(component.direction).toBeNull();
    });

    it('Passed non place command as first command- MOVE', () => {
      component.move();
      expect(component.x).toBeNull();
      expect(component.y).toBeNull();
      expect(component.direction).toBeNull();
    });

    it('Execute a PLACE then RIGHT command', () => {
      placeToyCommand(1, 1, 'NORTH');
      component.rotate(Rotations.Right);
      expect(component.x).toEqual(1);
      expect(component.y).toEqual(1);
      expect(component.direction).toEqual('EAST');
    });

    it('Executed a PLACE then LEFT command', () => {
      placeToyCommand(1, 1, 'NORTH');
      component.rotate(Rotations.Left);
      expect(component.x).toEqual(1);
      expect(component.y).toEqual(1);
      expect(component.direction).toEqual('WEST');
    });

    it('Executed a PLACE then PLACE command', () => {
      placeToyCommand(1, 1, 'NORTH');
      placeToyCommand(2, 2, 'NORTH');
      expect(component.x).toEqual(2);
      expect(component.y).toEqual(2);
      expect(component.direction).toEqual('NORTH');
    });

    it('Executed a PLACE than MOVE command', () => {
      placeToyCommand(1, 1, 'NORTH');
      component.move();
      expect(component.x).toEqual(1);
      expect(component.y).toEqual(2);
      expect(component.direction).toEqual('NORTH');
    });

    it('Executed a PLACE then REPORT command', () => {
      placeToyCommand(1, 1, 'NORTH');
      component.report();
      expect(component.x).toEqual(1);
      expect(component.y).toEqual(1);
      expect(component.direction).toEqual('NORTH');
    });
  });
});