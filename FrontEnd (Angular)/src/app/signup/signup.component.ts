import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;


  signupForm !: FormGroup;

  constructor(private elementRef: ElementRef, private formBuilder:FormBuilder,
     private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      mobile : ['', Validators.required],
      password : ['', Validators.required],
      confirmpwd : ['', Validators.required],
    })
  }

  signup(){
    this.httpClient.post<any>("http://localhost:8080/api/users/",this.signupForm.value)
    .subscribe(res => {
      alert("Signup is Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = 'lightblue';
  }
}
