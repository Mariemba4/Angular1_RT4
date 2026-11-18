import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvTech } from './cv-tech';

describe('CvTech', () => {
  let component: CvTech;
  let fixture: ComponentFixture<CvTech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvTech],
    }).compileComponents();

    fixture = TestBed.createComponent(CvTech);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
