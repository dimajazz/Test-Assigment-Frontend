import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExchangeRateService } from '../services/exchange-rate.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CurrencyConverterComponent implements OnInit {
  rates: any;
  amount1: number = 0;
  amount2: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getRates().subscribe((data: any) => {
      this.rates = data.rates;
    });
  }

  convertFromFirst(): void {
    const amount2 = this.exchangeRateService.convertFromFirst(
      this.fromCurrency,
      this.toCurrency,
      this.amount1
    );
    if (amount2) {
      this.amount2 = amount2;
    }
  }

  convertFromSecond(): void {
    const amount1 = this.exchangeRateService.convertFromSecond(
      this.fromCurrency,
      this.toCurrency,
      this.amount2
    );
    if (amount1) {
      this.amount1 = amount1;
    }
  }

  onCurrencyChange(): void {
    this.convertFromFirst();
  }
}
