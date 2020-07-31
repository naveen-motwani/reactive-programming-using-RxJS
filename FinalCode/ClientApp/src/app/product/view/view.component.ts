import { Observable, of } from 'rxjs';
import { ProductService } from './../service/product.service';
import { ProductViewModel } from './../model/product.view.model';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductCategory } from '../model/product-category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit {
  formGroup: FormGroup;
  categories: Array<ProductCategory> = [];
  productViewModel: ProductViewModel = new ProductViewModel();
  productViewModel$: Observable<ProductViewModel>;
  productId: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.productId = this.activateRoute.snapshot.params.id;
  }
  ngOnInit(): void {
    this.getProductInfo();
  }

  getProductInfo() {
    // without async methjod -1
    this.productViewModel$ = this.productService.getProduct(this.productId)
      .pipe(concatMap((product) => {
        return this.productService.getProductCategory(product.categoryId).pipe(
          map((category) => {
            const productViewModel: ProductViewModel = {
              ...product,
              priceInLocalCurrency: product.price * 75,
              categoryName: category ? category.name : '',
            };

            return productViewModel;
          })
        );
      }));
  }

  cancel() {
    this.router.navigateByUrl('/products');
  }
}
