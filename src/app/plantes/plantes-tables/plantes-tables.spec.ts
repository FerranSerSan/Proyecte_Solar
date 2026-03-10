import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantesTables } from './plantes-tables';

describe('PlantesTables', () => {
  let component: PlantesTables;
  let fixture: ComponentFixture<PlantesTables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantesTables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantesTables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
