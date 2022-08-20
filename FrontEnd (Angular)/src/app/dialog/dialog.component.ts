import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  conditionList = ['New', 'Second Hand', 'Refurbished']

  productForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder, private toast: NgToastService,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required],
    })
    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['condition'].setValue(this.editData.condition);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.apiService.postProduct(this.productForm.value).subscribe(resp => {
          // alert("Product Added Successfully!!!");
          this.toast.success({ detail: "Added!", summary: "Product Added Successfully!!!", duration: 3000 });
          this.productForm.reset();
          this.dialogRef.close('save');
        },
          error => this.toast.error({ detail: "Error!", summary: "Error While Adding The Product!!", duration: 4000 })); // alert("Error While Adding The Product!!"));
     }
    }
    else {
      this.updateProduct()
    }
  }
  updateProduct() {
    this.apiService.putProduct(this.productForm.value, this.editData.id)
      .subscribe(resp => {
       // alert("Product Updated Successfully!")
       this.toast.success({ detail: "Updated!", summary: "Product Updated Successfully!!!", duration: 3000 });
        this.productForm.reset();
        this.dialogRef.close('update');
      },
        //error => alert("Error While Updating The Product!!"));
      error =>  this.toast.error({ detail: "Error!", summary: "Error While Updating The Product!!", duration: 4000 }));
    }
}
