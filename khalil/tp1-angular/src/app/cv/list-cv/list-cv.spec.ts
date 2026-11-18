import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCv } from './list-cv';

describe('ListCv', () => {
  let component: ListCv;
  let fixture: ComponentFixture<ListCv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCv],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCv);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cvs', []);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
