import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, CurrencyPipe],
  selector: 'app-ttc',
  styleUrl: './ttc.css',
  templateUrl: './ttc.html',
})
export class Ttc {
  prixHt = signal(0);
  quantite = signal(1);
  tva = signal(18);

  prixUnitaireTtc = computed(() => this.prixHt() * (1 + this.tva() / 100));

  tauxRemise = computed(() => {
    if (this.quantite() > 15) return 0.3;
    if (this.quantite() > 10) return 0.2;
    return 0;
  });

  montantBrut = computed(() => this.prixUnitaireTtc() * this.quantite());
  discount = computed(() => this.montantBrut() * this.tauxRemise());
  prixTotalTtc = computed(() => this.montantBrut() - this.discount());
}
