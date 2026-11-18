import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmbaucheList } from './embauche-list';

describe('EmbaucheList', () => {
  let component: EmbaucheList;
  let fixture: ComponentFixture<EmbaucheList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbaucheList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmbaucheList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
