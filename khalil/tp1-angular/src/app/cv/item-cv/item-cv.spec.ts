import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCv } from './item-cv';

describe('ItemCv', () => {
  let component: ItemCv;
  let fixture: ComponentFixture<ItemCv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCv],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCv);
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
