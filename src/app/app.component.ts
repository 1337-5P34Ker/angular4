import { ProductsComponent } from './products/products.component';
import { products } from './products';
import { Component } from '@angular/core';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Hello World!';
    date = new Date(new Date(1971,8,20).toISOString());
    
  

    onButtonClick() {
      console.log(this.date.toUTCString());
        this.title = JSON.stringify(this.date);
    }
}
