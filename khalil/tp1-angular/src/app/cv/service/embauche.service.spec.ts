import { TestBed } from '@angular/core/testing';
import { Cv } from '../model/cv';
import { EmbaucheService } from './embauche.service';

const cvNumero = (id: number): Cv => ({
  id,
  name: `nom${id}`,
  firstname: `prenom${id}`,
  age: 30,
  cin: '00000000',
  job: 'dev',
  path: 'images/avatar.svg',
});

describe('EmbaucheService', () => {
  let service: EmbaucheService;

  beforeEach(() => {
    service = TestBed.inject(EmbaucheService);
  });

  it('ajoute un cv embauché', () => {
    expect(service.embaucher(cvNumero(1))).toBe(true);
    expect(service.getEmbauches()().length).toBe(1);
  });

  it('refuse un cv déjà embauché', () => {
    service.embaucher(cvNumero(1));
    expect(service.embaucher(cvNumero(1))).toBe(false);
    expect(service.getEmbauches()().length).toBe(1);
  });

  it('garde le cv embauché même si le budget est dépassé', () => {
    [1, 2, 3].forEach((id) => service.embaucher(cvNumero(id)));
    expect(service.budgetDepasse()).toBe(false);
    expect(service.embaucher(cvNumero(4))).toBe(true);
    expect(service.budgetDepasse()).toBe(true);
    expect(service.getEmbauches()().length).toBe(4);
  });
});
