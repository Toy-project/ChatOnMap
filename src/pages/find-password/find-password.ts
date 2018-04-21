import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from 'ionic-angular';

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
              private formBuilder:FormBuilder,
              public alertCtrl: AlertController) {
    this.findPasswordForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  async findPassword(): Promise<any> {
    try {
      const email = this.findPasswordForm.controls['email'].value;
      await this.authProvider.setNewPasswordByEmail(email);
    } catch (e) {
      throw e;
    }
  }

}
