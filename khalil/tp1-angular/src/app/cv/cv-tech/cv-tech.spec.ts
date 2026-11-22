import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideToastr } from 'ngx-toastr';
import { API } from '../../config/api.config';
import { Cv } from '../model/cv';
import { CvTech } from './cv-tech';

describe('CvTech', () => {
  let component: CvTech;
  let httpMock: HttpTestingController;

  const cvApi: Cv = {
    id: 99,
    name: 'api',
    firstname: 'cv',
    age: 20,
    cin: '00000000',
    job: 'tester',
    path: 'images/avatar.svg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CvTech],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideToastr()],
    });
    httpMock = TestBed.inject(HttpTestingController);
    component = TestBed.createComponent(CvTech).componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("affiche les cvs de l API", () => {
    httpMock.expectOne(API.cv).flush([cvApi]);
    expect(component.cvs()).toEqual([cvApi]);
  });

  it("affiche les fakeCvs si l API est en erreur", () => {
    httpMock.expectOne(API.cv).flush('erreur', { status: 500, statusText: 'Server Error' });
    expect(component.cvs().length).toBe(5);
  });

  it("récupère le détail depuis l API, sinon le fakeCv", () => {
    httpMock.expectOne(API.cv).flush([cvApi]);

    component.onSelectCv(cvApi);
    httpMock.expectOne(API.cv + cvApi.id).flush(cvApi);
    expect(component.selectedCv()).toEqual(cvApi);

    component.onSelectCv({ ...cvApi, id: 1 });
    httpMock.expectOne(API.cv + 1).flush('introuvable', { status: 404, statusText: 'Not Found' });
    expect(component.selectedCv()?.name).toBe('khalil');
  });
});
