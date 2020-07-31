import { Product } from '../model/product.model';
import { ProductCategory } from '../model/product-category.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductViewModel } from '../model/product.view.model';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, combineLatest, Subject, BehaviorSubject, of } from 'rxjs';
import { map, concatMap, mergeMap, switchMap, debounce, debounceTime, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'category', 'price', 'action'];
  spinner: boolean;
  // for data
  categories: Array<ProductCategory>;
  products: Array<Product>;
  products$: Observable<Array<Product>>;
  productsViewModel$: Observable<Array<ProductViewModel>>;
  categories$: Observable<Array<ProductCategory>>;
  // for reactive form
  searchFormGroup: FormGroup;
  componentDestroy = new Subject<boolean>();
  // subsjects and behaviour subjects
  selectedCategoryId$ = new BehaviorSubject<string>('0');

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.componentDestroy.next(true);
  }

  ngOnInit() {
    this.setSpinnerValue(true);
    this.createSearchForm();
    // this.loadProducts();
    this.loadCategories();
    this.loadCategoriesWithCombinLatest();
    this.subscribeToValueChange();
  }

  createSearchForm() {
    this.searchFormGroup = this.formBuilder.group({
      name: [''],
      categoryId: [''],
      mobileNumber: [''],
    });
  }

  loadProducts(): void {
    this.productsViewModel$ = this.productService.getProducts()
      .pipe(map((products) => {
        const productsVieModel = Array<ProductViewModel>();
        products.map((product) => {
          const productViewModel: ProductViewModel = {
            ...product,
            priceInLocalCurrency: product.price * 75,
          };

          productsVieModel.push(productViewModel);
        });

        return productsVieModel;
      }));
  }

  loadCategories(): void {
    this.categories$ = this.productService.getProductCategories();
  }

  loadCategoriesWithCombinLatest(): void {
    this.categories$ = this.productService.getProductCategories();
    this.products$ = this.productService.getProducts();

    this.productsViewModel$ = combineLatest([this.products$, this.categories$, this.selectedCategoryId$])
      .pipe(map(([products, categories, selectedCategory]) => {
        if (selectedCategory && selectedCategory !== '0') {
          products = products.filter(elem => elem.categoryId === +selectedCategory);
        }
        const productsVieModel = Array<ProductViewModel>();
        products.map((product) => {
          const category = categories.find(elem => elem.id === product.categoryId);
          const productViewModel: ProductViewModel = {
            ...product,
            priceInLocalCurrency: product.price * 75,
            categoryName: category ? category.name : '',
          };

          productsVieModel.push(productViewModel);
        });

        return productsVieModel;
      }))
  }

  showSpinner(): boolean {
    return this.spinner;
  }

  setSpinnerValue(show: boolean) {
    this.spinner = show;
  }

  private subscribeToValueChange() {
    this.searchFormGroup.controls.categoryId.valueChanges
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((changedValue) => {
        this.selectedCategoryId$.next(changedValue);
      });

    // this.switchMapExampleInSearch();
    // this.mergeMapExampleInSearch();
    // this.concateMapExampleInSearch();
    // this.switchMapExampleInSearchWithDebounceGridBinding();
    // this.searchFormGroup.controls.name.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  concateMapExampleInSearch() {
    this.searchFormGroup.controls.name.valueChanges
      .pipe(
        concatMap((name: string) => {
          if (name) {
            console.log('value change from concat map ' + name);
            return this.productService.searchProducts(name)
              .pipe(map((returnedProducts: Array<Product>) => {
                return returnedProducts.length > 0 ? returnedProducts.map(elem => elem.name) : [];
              }));
          } else {
            return of(name);
          }
        }))
      .subscribe((name) => {
        if (name) {
          console.log('value change from subscribe ' + name);
        }
      });
  }

  mergeMapExampleInSearch() {
    this.searchFormGroup.controls.name.valueChanges
      .pipe(
        mergeMap((name: string) => {
          if (name) {
            console.log('value change from merge map ' + name);
            return this.productService.searchProducts(name)
              .pipe(map((returnedProducts: Array<Product>) => {
                return returnedProducts.length > 0 ? returnedProducts.map(elem => elem.name) : [];
              }));
          } else {
            return of(name);
          }
        })
      )
      .subscribe((name) => {
        if (name) {
          console.log('value change from subscribe ' + name);
        }
      });
  }

  switchMapExampleInSearch() {
    this.searchFormGroup.controls.name.valueChanges
      .pipe(
        switchMap((name: string) => {
          if (name) {
            console.log('value change from switch map ' + name);
            return this.productService.searchProducts(name)
              .pipe(map((returnedProducts: Array<Product>) => {
                return returnedProducts.length > 0 ? returnedProducts.map(elem => elem.name) : [];
              }));
          } else {
            return of([name]);
          }
        })
      )
      .subscribe((name) => {
        if (name) {
          console.log('value change from subscribe ' + name);
        }
      });
  }

  switchMapExampleInSearchWithDebounce() {
    this.searchFormGroup.controls.name.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((name: string) => {
          if (name) {
            console.log('value change from switch map ' + name);
            return this.productService.searchProducts(name)
              .pipe(map((returnedProducts: Array<Product>) => {
                return returnedProducts.length > 0 ? returnedProducts.map(elem => elem.name) : [];
              }));
          } else {
            return of([name]);
          }
        })
      )
      .subscribe((name) => {
        if (name) {
          console.log('value change from subscribe ' + name);
        }
      });
  }

  switchMapExampleInSearchWithDebounceGridBinding() {
    this.productsViewModel$ = this.searchFormGroup.controls.name.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        switchMap((name: string) => {
          if (true) {
            this.products$ = name ? this.productService.searchProducts(name) : this.productService.getProducts();
            this.categories$ = this.productService.getProductCategories();
            return combineLatest(this.products$, this.categories$).pipe(
              map(([products, categories]) => {
                const productsVieModel = Array<ProductViewModel>();
                products.map((product) => {
                  console.log('map from somewhere');
                  const category = categories.find(elem => elem.id === product.categoryId);
                  const productViewModel: ProductViewModel = {
                    ...product,
                    priceInLocalCurrency: product.price * 75,
                    categoryName: category ? category.name : '',
                  };

                  productsVieModel.push(productViewModel);
                });

                return productsVieModel;
              })
            );
          } else {
            const productsVieModel: Array<ProductViewModel> = [];
            return of(productsVieModel);
          }
        })
      );
  }
}
