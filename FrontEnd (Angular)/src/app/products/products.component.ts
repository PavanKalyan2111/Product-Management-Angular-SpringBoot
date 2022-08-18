import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface ProductList {
  productname: string;
  category: string;
  date: number;
  condition: string;
  price: number;
  comments: string;

}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category', 'date', 'condition', 'price', 'comments', 'actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(public dialog: MatDialog, private apiService: ApiService) {
    
  }

  ngOnInit(): void {
    this.getAllProducts()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val==='save'){
        this.getAllProducts();
      }
    })

  }

  getAllProducts(){
    this.apiService.getProduct().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => alert("Error While Fetching Data"));
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val ==='update'){
        this.getAllProducts();
      }
    })   
  }

  deleteProduct(id:number){
    this.apiService.deleteProduct(id).subscribe(resp =>{
      alert("Product Deleted Successfully");
      this.getAllProducts();
    },
    error => alert("Error While Deleting the Product"));
  }
}
