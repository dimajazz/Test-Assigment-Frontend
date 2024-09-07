import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/UAH';
  rates: any;

  constructor(private http: HttpClient) {
    this.rates = this.getRates().subscribe((data: any) => {
      this.rates = data.rates;
    });
  }

  getRates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  convertCurrency(
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ): number | void {
    if (this.rates) {
      const fromRate = this.rates[fromCurrency];
      const toRate = this.rates[toCurrency];
      const convertedAmount = (amount * toRate) / fromRate;
      return Math.abs(Math.round(convertedAmount * 100) / 100);
    }
  }

  convertFromFirst(
    fromCurrency: string,
    toCurrency: string,
    amount1: number
  ): number | void {
    if (this.rates) {
      const fromRate = this.rates[fromCurrency];
      const toRate = this.rates[toCurrency];
      const amount2 = (amount1 * toRate) / fromRate;
      return Math.abs(Math.round(amount2 * 100) / 100);
    }
  }

  convertFromSecond(
    fromCurrency: string,
    toCurrency: string,
    amount2: number
  ): number | void {
    if (this.rates) {
      const fromRate = this.rates[fromCurrency];
      const toRate = this.rates[toCurrency];
      const amount1 = (amount2 * fromRate) / toRate;
      return Math.abs(Math.round(amount1 * 100) / 100);
    }
  }
}
