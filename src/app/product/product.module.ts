import { NgModule } from '@angular/core';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { CreateeditComponent } from './createedit/createedit.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [DeleteComponent, ListComponent, CreateeditComponent, ImageComponent ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [ListComponent]
})
export class ProductModule { }
