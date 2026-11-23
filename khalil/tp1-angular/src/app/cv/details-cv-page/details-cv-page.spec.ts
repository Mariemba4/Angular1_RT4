import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { API } from '../../config/api.config';
import { Cv } from '../model/cv';
import { DetailsCvPage } from './details-cv-page';

describe('DetailsCvPage', () => {
  let component: DetailsCvPage;
  let httpMock: HttpTestingController;
  let router: Router;

  const cvApi: Cv = {
    id: 99,
    name: 'api',
    firstname: 'cv',
    age: 20,
    cin: '00000000',
    job: 'tester',
    path: 'images/avatar.svg',
  };

  const creerPage = (id: number) => {
    TestBed.configureTestingModule({
      imports: [DetailsCvPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: String(id) }) } },
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component = TestBed.createComponent(DetailsCvPage).componentInstance;
  };

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it("charge le cv de l'id de la route", () => {
    creerPage(99);
    httpMock.expectOne(API.cv + 99).flush(cvApi);
    expect(component.cv()).toEqual(cvApi);
  });

  const expectDelete = (id: number) =>
    httpMock.expectOne((req) => req.method === 'DELETE' && req.url === API.cv + id);

  it('supprime le cv via l\'API puis renvoie vers la liste', () => {
    creerPage(99);
    httpMock.expectOne(API.cv + 99).flush(cvApi);

    component.deleteCv();
    expectDelete(99).flush({});
    expect(router.navigate).toHaveBeenCalledWith(['/cv']);
  });

  it("renvoie vers le login si l'API refuse la suppression (401)", () => {
    localStorage.setItem('token', 'token-expire');
    creerPage(99);
    httpMock.expectOne(API.cv + 99).flush(cvApi);

    component.deleteCv();
    expectDelete(99).flush('refus', { status: 401, statusText: 'Unauthorized' });
    expect(localStorage.getItem('token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it("supprime le cv fictif si l'API est en erreur", () => {
    creerPage(1);
    httpMock.expectOne(API.cv + 1).flush('erreur', { status: 500, statusText: 'Server Error' });
    expect(component.cv()?.name).toBe('khalil');

    component.deleteCv();
    expectDelete(1).flush('erreur', { status: 500, statusText: 'Server Error' });
    expect(router.navigate).toHaveBeenCalledWith(['/cv']);
  });
});
