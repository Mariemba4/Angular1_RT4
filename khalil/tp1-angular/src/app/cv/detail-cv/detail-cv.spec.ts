import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCv } from './detail-cv';

describe('DetailCv', () => {
  let component: DetailCv;
  let fixture: ComponentFixture<DetailCv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCv],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCv);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cv', {
      id: 1,
      name: 'sellaouti',
      firstname: 'aymen',
      age: 40,
      cin: '12345678',
      job: 'trainer',
      path: 'images/avatar.svg',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
