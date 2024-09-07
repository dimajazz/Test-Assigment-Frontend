import { Component, OnInit } from '@angular/core';

import { ExchangeRateService } from '../services/exchange-rate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  rates: { [key: string]: number } = {};
  toCurrency = 'UAH';

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getRates().subscribe((data: any) => {
      const fromCurrencyArray = ['USD', 'EUR', 'CAD', 'GBP', 'AUD'];
      fromCurrencyArray.forEach((fromCurrency) => {
        this.rates[fromCurrency] =
          Math.round(100 / data.rates[fromCurrency]) / 100;
      });
    });
  }
}
