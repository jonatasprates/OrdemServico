import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemServicoListComponent } from './ordem-servico-list.component';

describe('OrdemServicoListComponent', () => {
  let component: OrdemServicoListComponent;
  let fixture: ComponentFixture<OrdemServicoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemServicoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemServicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
