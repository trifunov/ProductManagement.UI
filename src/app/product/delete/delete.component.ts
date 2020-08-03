import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  showDeletePopUpById: number;
  successfulDelete: boolean;

  constructor(private productService: ProductService) {
    this.productService.showDeletePopUpById.subscribe((data) => {
      this.showDeletePopUpById = data;
    });
  }

  ngOnInit(): void {
  }

  proceed(toDelete: boolean) {
    if (toDelete === true) {
      this.productService.delete(this.showDeletePopUpById).subscribe(data => {
        //this.successfulDelete = true;
        this.productService.getAll();
      });
    }
    this.productService.showDeletePopUpById.next(0);
  }
}
