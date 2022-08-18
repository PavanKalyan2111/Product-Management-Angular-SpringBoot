import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  postProduct(data: any){
    return this.httpClient.post<any>("http://localhost:8080/api/postproduct",data);
  }

  getProduct(){
    return this.httpClient.get<any>("http://localhost:8080/api/products");
  }

  putProduct(data: any, id : number){
    return this.httpClient.put<any>("http://localhost:8080/api/updateproduct/"+id,data);
  }
  deleteProduct(id:any){
    return this.httpClient.delete<any>("http://localhost:8080/api/deleteproduct/"+id);
  }
}
