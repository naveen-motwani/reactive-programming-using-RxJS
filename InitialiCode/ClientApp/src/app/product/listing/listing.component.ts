import { Product } from '../model/product.model';
import { ProductCategory } from '../model/product-category.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductViewModel } from '../model/product.view.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'action'];
  spinner: boolean;
  // for data
  categories: Array<ProductCategory>;
  products: Array<ProductViewModel>;

  // for reactive form
  searchFormGroup: FormGroup;

  // subsjects and behaviour subjects

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.setSpinnerValue(true);
    this.createSearchForm();
    this.loadProducts();
  }

  createSearchForm() {
    this.searchFormGroup = this.formBuilder.group({
      name: [''],
      categoryId: [''],
      mobileNumber: [''],
    });
  }

  loadProducts(): void {
    this.productService.getProducts()
      .subscribe(elem => {
        this.products = elem;
      });
  }

  showSpinner(): boolean {
    return this.spinner;
  }

  setSpinnerValue(show: boolean) {
    this.spinner = show;
  }
}
