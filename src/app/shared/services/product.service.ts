import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { ProductImage } from '../models/productimage';
import { Image } from '../models/image';
import { UploadImage } from '../models/uploadimage';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl: string = '';

  public showDeletePopUpById = new BehaviorSubject(0);
  public showCreateEditPopUpById = new BehaviorSubject(-1);
  public showImagesPopUpById = new BehaviorSubject(0);

  private productToEditSource = new BehaviorSubject<Product>({ id: -1, warehouseId: -1, description: '', price: -1 });
  productToEditObs = this.productToEditSource.asObservable();

  private productGetAllSource = new BehaviorSubject<Product[]>([]);
  productGetAllObs = this.productGetAllSource.asObservable();

  private tempImages: any;
  private productImageGetSource = new BehaviorSubject<ProductImage>({ productId: -1, images: this.tempImages });
  productImageGetObs = this.productImageGetSource.asObservable();

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

  getImagesByProductId(id: number) {
    this.http.get<ProductImage>(this.baseUrl + "/productimage/GetByProductId?productId=" + id).subscribe(data => {
      this.productImageGetSource.next(data);
      this.showImagesPopUpById.next(id);
    });
  }

  setProductForCreate() {
    var product = new Product();
    product.id = 0;
    product.warehouseId = null;
    product.description = '';
    product.price = null;

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

  uploadImage(uploadImage: UploadImage) {
    return this.http.post(this.baseUrl + "/productimage/add", uploadImage);
  }

  deleteImage(productId: number, imageId: number) {
    return this.http.get(this.baseUrl + "/productimage/delete?productId=" + productId + "&imageId=" + imageId);
  }
}
