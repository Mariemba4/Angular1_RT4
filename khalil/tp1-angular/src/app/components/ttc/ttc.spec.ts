import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ttc } from './ttc';

describe('Ttc', () => {
  let component: Ttc;
  let fixture: ComponentFixture<Ttc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ttc],
    }).compileComponents();

    fixture = TestBed.createComponent(Ttc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    [10, 1180, 0],
    [11, 1038.4, 259.6],
    [15, 1416, 354],
    [20, 1652, 708],
  ])('quantité %d : total %d et remise %d', (quantite, total, remise) => {
    component.prixHt.set(100);
    component.quantite.set(quantite);
    expect(component.prixTotalTtc()).toBeCloseTo(total);
    expect(component.discount()).toBeCloseTo(remise);
  });
});
