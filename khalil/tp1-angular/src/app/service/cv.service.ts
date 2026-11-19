import { Service } from '@angular/core';
import { Cv } from '../model/cv';

@Service()
export class CvService {
  private readonly cvs: Cv[] = [
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

  getCvs(): Cv[] {
    return this.cvs;
  }
}
