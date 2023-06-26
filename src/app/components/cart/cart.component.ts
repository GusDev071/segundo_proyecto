import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  purchaseSuccess: boolean = false;   
  products : any = [];
  grandTotal !: number;
      constructor(private CartService : CartService) { }

      ngOnInit(): void {
        this.CartService.getProducts()
        .subscribe(res=>{
          this.products = res;
          this.grandTotal = this.CartService.getTotalPrice();
        })
      }
  
      removeItem(item : any){
        this.CartService.removeCartItem(item);
      }

      emptycart(){
        this.CartService.removeAllCart();
      }

      onPurchase() {
        // Lógica para realizar la compra
        this.purchaseSuccess = true;
        
      }
}
