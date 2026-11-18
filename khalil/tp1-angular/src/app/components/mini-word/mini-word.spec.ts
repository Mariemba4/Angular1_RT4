import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniWord } from './mini-word';

describe('MiniWord', () => {
  let component: MiniWord;
  let fixture: ComponentFixture<MiniWord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniWord],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniWord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
