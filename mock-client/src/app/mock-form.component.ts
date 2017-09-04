import { Mock, Header } from './mock';
import { Component, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'mock-form',
  templateUrl: './mock-form.component.html'
})
export class MockFormComponent{

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder) {
      this.createForm();
    }
  
    
  mockForm: FormGroup;

  codes = [200, 300, 404, 500];

  submitted = false;

  response = '';

  onSubmit(mock: Mock) {
    this.submitted = true;
    console.log(JSON.stringify(mock));
//    this.http.post('http://localhost:8080/save', JSON.stringify(this.mockForm.value), {
//      headers: new HttpHeaders().set('Content-Type', 'application/json'),
//      responseType: 'text'
//    }).subscribe(data => this.response = data);
  }
    
  createForm() {
     this.mockForm = this.formBuilder.group({
         statusCode: [1],
         contentType: '',
         encoding: '',
         headers: this.formBuilder.array([this.createHeader()]),
         body: 'Test'
      });
  }
  
  createHeader(): FormGroup {
    return this.formBuilder.group({
      name: '',
      value: ''
    });
  }
  
//  setHeaders(headers: Header[]) {
//    const headerFGs = headers.map(header => this.formBuilder.group(header));
//    const headerFormArray = this.formBuilder.array(headerFGs);
//    this.mockForm.setControl('headers', headerFormArray);
//  }
    
  addHeader(): void {
      this.headers.push(this.createHeader());
    }
  
  delHeader(i: number): void {
      this.headers.removeAt(i);
    }
    
    
  get headers(): FormArray {
      return this.mockForm.get('headers') as FormArray;
  }
  
} 
