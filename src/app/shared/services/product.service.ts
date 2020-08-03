import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl: string = '';

  public showDeletePopUpById = new BehaviorSubject(0);
  public showCreateEditPopUpById = new BehaviorSubject(-1);

  private productToEditSource = new BehaviorSubject<Product>({ id: -1, name: '', image: '', price: -1 });
  productToEditObs = this.productToEditSource.asObservable();

  private productGetAllSource = new BehaviorSubject<Product[]>([]);
  productGetAllObs = this.productGetAllSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  //getAll() {
  //  return this.http.get<Product[]>(this.baseUrl + "/product/getall");
  //}

  getAll() {
    return this.http.get<Product[]>(this.baseUrl + "/product/getall").subscribe(data => {
      this.productGetAllSource.next(data);
    });
  }

  getProductByIdForEdit(id: number) {
    this.http.get<Product>(this.baseUrl + "/product/getbyid?id=" + id).subscribe(data => {
      this.productToEditSource.next(data);
      this.showCreateEditPopUpById.next(id);
    });
  }

  setProductForCreate() {
    var product = new Product();
    product.id = 0;
    product.name = '';
    product.image = '';
    product.price = 0;

    this.productToEditSource.next(product);
    this.showCreateEditPopUpById.next(0);
  }

  create(product: Product) {
    return this.http.post(this.baseUrl + "/product/add", product);
  }

  edit(product: Product) {
    return this.http.post(this.baseUrl + "/product/update", product);
  }

  delete(id:number) {
    return this.http.get(this.baseUrl + "/product/delete?id=" + id);
  }
}
