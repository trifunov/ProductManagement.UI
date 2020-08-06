import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Image } from '../../shared/models/image';
import { ProductImage } from '../../shared/models/productimage';
import { UploadImage } from '../../shared/models/uploadimage';

@Component({
  selector: 'app-product-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  showImagesPopUpById: number;
  images: Image[];

  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.showImagesPopUpById.subscribe(data => {
      this.showImagesPopUpById = data;
    });

    this.productService.productImageGetObs.subscribe(data => {
      this.images = data.images;
    });
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg'];

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        return false;
      }

      const file = fileInput.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        var image = new UploadImage();
        image.productId = this.showImagesPopUpById;
        image.image = reader.result.toString();
        this.productService.uploadImage(image).subscribe(data => {
          this.productService.getImagesByProductId(this.showImagesPopUpById);
        });
      };
    }
  }

  closeImages() {
    this.productService.showImagesPopUpById.next(0);
  }

  deleteImage(productId: number, imageId: number) {
    this.productService.deleteImage(productId, imageId).subscribe(data => {
      this.productService.getImagesByProductId(this.showImagesPopUpById);
    });
  }
}
