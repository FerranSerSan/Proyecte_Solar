import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantesTablesRow } from './plantes-tables-row';

describe('PlantesTablesRow', () => {
  let component: PlantesTablesRow;
  let fixture: ComponentFixture<PlantesTablesRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantesTablesRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantesTablesRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
