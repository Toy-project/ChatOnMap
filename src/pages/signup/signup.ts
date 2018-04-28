import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;
  isEquelPassword: boolean = true;

  id: AbstractControl;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  password_confirm: AbstractControl;

  signupLoader: any;

  //벨리데이션 메세지
  validation_messages = {
    'id': [
       { type: 'required', message: '아이디를 입력해 주세요.' },
    ],
    'name': [
      { type: 'required', message: '이름를 입력해 주세요.' },
    ],
    'email': [
      { type: 'required', message: '이메일를 입력해 주세요.' },
      { type: 'email', message: '올바른 이메일을 입력해 주세요.' },
    ],
    'password': [
  		{ type: 'required', message: '비밀번호를 입력해 주세요.' },
  		{ type: 'pattern', message: '숫자, 소문자, 대문자로 만들어 주세요.' },
  		{ type: 'minlength', message: '최소 길이는 8자입니다.' }
  	]
  };

  constructor( public memberProvider: MemberProvider,
               public nav: NavController,
               private formBuilder: FormBuilder,
               public loadingCtrl: LoadingController,
               public alertCtrl: AlertController ) {
    //form validator
    this.signUpForm = this.formBuilder.group({
      'id': ['', Validators.compose([Validators.required])],
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      'password_confirm': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.id = this.signUpForm.controls['id'];
    this.name = this.signUpForm.controls['name'];
    this.email = this.signUpForm.controls['email'];
    this.password = this.signUpForm.controls['password'];
    this.password_confirm = this.signUpForm.controls['password_confirm'];
  }

  presentLoading(): void {
    this.signupLoader = this.loadingCtrl.create({
      spinner: 'dots'
    });

    this.signupLoader.present();
  }

  dismissLoading(): void {
    this.signupLoader.dismiss();
  }

  warningMsg(contents: string): void {
    const alert = this.alertCtrl.create({
      subTitle: contents,
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   *  Sign up
   * @param  {string} email
   * @param  {string} password
   */
  async signup(value): Promise<any> {
    try {
      this.presentLoading();
      const result = await this.memberProvider.signup(value);

      // 회원가입 시 로그인 페이지로 이동
      if(result) {
        this.warningMsg('회원가입이 완료되었습니다.');
        this.nav.push('LoginPage');
        this.dismissLoading();
      }
    } catch (e) {
      console.log(e);
    }
  }

}
