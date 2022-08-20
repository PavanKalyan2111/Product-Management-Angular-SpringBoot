import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup';


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
  constructor(public dialog: MatDialog, private apiService: ApiService,
     private router: Router, private toast: NgToastService) {
    
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

  about(){
    this.router.navigate(['about']);
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
  //  error => alert("Error While Fetching Data"));
  error => this.toast.error({detail:"Error!",summary:"Error While Fetching Data!!",duration:5000}));
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
     // alert("Product Deleted Successfully!!!");
     this.toast.success({detail:"Deleted!",summary:"Product Deleted Successfully!!!",duration:3000});
      this.getAllProducts();
    },
    error => alert("Error While Deleting the Product"));
  }

  logout(){
    this.toast.success({detail:'Logged out!',summary:"You have Successfully Logged out!!!",duration:3000})
    this.router.navigate(['login']);
    localStorage.clear();//to entirely clear local storage
  }
}
