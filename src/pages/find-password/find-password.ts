import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//providers
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html',
})
export class FindPasswordPage {
  findPasswordForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider:AuthProvider,
              private formBuilder:FormBuilder) {
    this.findPasswordForm = this.formBuilder.group({
      'name': [''],
      'email': ['']
    });
  }

  async findPassword(): Promise<any> {
    console.log('-----------------------------------------');
    console.log('findPassword :');
    console.log('-----------------------------------------');
    try {
      const email = this.findPasswordForm.controls['email'].value;
      const result = await this.authProvider.findPassword(email);
    } catch (e) {
      //error
    }
  }

}
