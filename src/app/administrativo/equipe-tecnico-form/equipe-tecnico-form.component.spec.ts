import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeTecnicoFormComponent } from './equipe-tecnico-form.component';

describe('EquipeTecnicoFormComponent', () => {
  let component: EquipeTecnicoFormComponent;
  let fixture: ComponentFixture<EquipeTecnicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeTecnicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeTecnicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
