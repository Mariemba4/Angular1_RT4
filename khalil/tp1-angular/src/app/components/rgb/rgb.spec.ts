import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rgb } from './rgb';

describe('Rgb', () => {
  let component: Rgb;
  let fixture: ComponentFixture<Rgb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rgb],
    }).compileComponents();

    fixture = TestBed.createComponent(Rgb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
