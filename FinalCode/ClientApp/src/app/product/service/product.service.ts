import { ProductCategory } from './../model/product-category.model';
import { Product } from './../model/product.model';
import { CommonHttpServiceService } from './../../shared/service/common-http-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private commonHttpServiceService: CommonHttpServiceService) { }

  getProducts(): Observable<Array<Product>> {
    return this.commonHttpServiceService.get<Array<Product>>('product');
  }

  getProduct(id: number): Observable<Product> {
    return this.commonHttpServiceService.get<Product>(`product/getProduct/${id}`);
  }

  searchProducts(name: string): Observable<Array<Product>> {
    return this.commonHttpServiceService.get<Array<Product>>(`product/searchProduct/${name}`);
  }

  getProductCategories(): Observable<Array<ProductCategory>> {
    return this.commonHttpServiceService.get<Array<ProductCategory>>('productCategories');
  }

  getProductCategory(id: number): Observable<ProductCategory> {
    return this.commonHttpServiceService.get<ProductCategory>(`productCategories/${id}`);
  }
}
