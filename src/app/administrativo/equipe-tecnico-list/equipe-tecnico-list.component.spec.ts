import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeTecnicoListComponent } from './equipe-tecnico-list.component';

describe('EquipeTecnicoListComponent', () => {
  let component: EquipeTecnicoListComponent;
  let fixture: ComponentFixture<EquipeTecnicoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeTecnicoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeTecnicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
