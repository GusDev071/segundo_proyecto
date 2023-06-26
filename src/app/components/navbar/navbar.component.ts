import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  totalItem: number = 0;
  searchResults: any[] = [];
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.cartService.searchProducts(term))
    );

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      });
  }

  formatResult(result: any): string {
    return result.name;
  }

  formatInput(input: any): string {
    return input.name || '';
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    if (query) {
      const keywords = query.split(' ');
      this.searchResults = this.cartService.searchProducts(keywords.join(' '));
    } else {
      this.searchResults = [];
    }
  }
}
