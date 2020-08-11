import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemServicoDetalheComponent } from './ordem-servico-detalhe.component';

describe('OrdemServicoDetalheComponent', () => {
  let component: OrdemServicoDetalheComponent;
  let fixture: ComponentFixture<OrdemServicoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemServicoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemServicoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
