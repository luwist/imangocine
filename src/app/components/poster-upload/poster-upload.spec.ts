import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PosterUpload } from './poster-upload';

describe('PosterUpload', () => {
  let component: PosterUpload;
  let fixture: ComponentFixture<PosterUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosterUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(PosterUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
