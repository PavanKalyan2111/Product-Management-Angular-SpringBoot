import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm !: FormGroup;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder,
    private httpClient: HttpClient, private router: Router ) { }
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required],

    })
}

  login(){
    this.httpClient.get<any>("http://localhost:8080/api/users/")
    .subscribe(res =>{
       const user = res.find((a:any) =>{
        return a.username === this.loginForm.value.username &&  a.password === this.loginForm.value.password
    });
    if(user){
      alert("Login is Successfull!!");
      this.loginForm.reset();
      this.router.navigate(['products']);
    }
    else{
      alert("User Not Found!!");
    }
  },
  error => alert("Something Went Wrong!!")
  );

  }
ngAfterViewInit() {
  this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = 'lightblue';
}
}
