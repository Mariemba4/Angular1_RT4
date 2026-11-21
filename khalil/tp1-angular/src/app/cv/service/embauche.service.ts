import { computed, Service, signal } from '@angular/core';
import { APP_CONST } from '../../config/const.config';
import { Cv } from '../model/cv';

@Service()
export class EmbaucheService {
  private embauches = signal<Cv[]>([]);
  budgetDepasse = computed(() => this.embauches().length > APP_CONST.maxEmbauches);

  getEmbauches() {
    return this.embauches.asReadonly();
  }

  /** Retourne false si le cv est déjà embauché. */
  embaucher(cv: Cv): boolean {
    if (this.embauches().some((embauche) => embauche.id === cv.id)) {
      return false;
    }
    this.embauches.update((list) => [...list, cv]);
    return true;
  }
}
