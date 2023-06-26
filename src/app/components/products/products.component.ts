import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public loading: boolean = false;
  public productList: any ;
  constructor(private api :  ApiService, private CartService : CartService) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getProduct()
    .subscribe(res => {
      this.productList = res;

      this.productList.forEach((a:any) => {
        Object.assign(a, {quantity:1, total: a.price});
      });

      this.loading = false;
    })
  }

  addToCart(item: any){
    this.CartService.addtoCart(item);
  }
}
