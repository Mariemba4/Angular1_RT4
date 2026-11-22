import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API } from '../../config/api.config';
import { Cv } from '../model/cv';
import { map, Observable } from 'rxjs';

@Service()
export class CvService {
  private http = inject(HttpClient);

  private readonly fakeCvs: Cv[] = [
    {
      id: 1,
      name: 'khalil',
      firstname: 'khalil',
      age: 40,
      cin: '12345678',
      job: 'trainer',
      path: 'images/avatar.svg',
    },
    {
      id: 2,
      name: 'sabri',
      firstname: 'sabri',
      age: 5,
      cin: '87654321',
      job: 'bb',
      path: 'images/avatar.svg',
    },
    {
      id: 3,
      name: 'worker',
      firstname: 'cherche travail',
      age: 30,
      cin: '11223344',
      job: 'nothing',
      path: 'images/cv.svg',
    },
    {
      id: 4,
      name: 'ben ali',
      firstname: 'amine',
      age: 25,
      cin: '22334455',
      job: 'developer',
      path: 'images/avatar.svg',
    },
    {
      id: 5,
      name: 'trabelsi',
      firstname: 'sarra',
      age: 28,
      cin: '33445566',
      job: 'designer',
      path: 'images/cv.svg',
    },
  ];

  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API.cv).pipe(map((cvs) => cvs.map((cv) => this.corrigerPath(cv))));
  }

  getCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(API.cv + id).pipe(map((cv) => this.corrigerPath(cv)));
  }

  /** Si l'API ne donne pas une vraie adresse d'image (http...), on met l'avatar par défaut. */
  private corrigerPath(cv: Cv): Cv {
    return cv.path?.startsWith('http') ? cv : { ...cv, path: 'images/avatar.svg' };
  }

  getFakeCvs(): Cv[] {
    return this.fakeCvs;
  }

  getFakeCvById(id: number): Cv | undefined {
    return this.fakeCvs.find((cv) => cv.id === id);
  }
}
