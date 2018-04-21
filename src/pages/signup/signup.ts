import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;
  isEquelPassword: boolean = true;

  constructor( public memberProvider: MemberProvider,
               public nav: NavController,
               private formBuilder: FormBuilder ) {
    //form validator
    this.signUpForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'password_confirm': ['', Validators.compose([Validators.required, Validators.minLength(8), this.equalto('password')])]
    });
  }

  /**
   *  Sign up
   * @param  {string} email
   * @param  {string} password
   */
  async signup(): Promise<any> {
    try {
      const result = await this.memberProvider.signup(this.signUpForm);

      // 회원가입 시 로그인 페이지로 이동
      if(result) {
        this.nav.push('LoginPage');
      }
    } catch (e) {
      console.log(e);
    }
  }

  //비밀번호 체크 함수
  equalto(password): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if(control.value === control.root.value[password]) {
        return { 'equalTo': true }
      }

      return null;
    };
  }

}
