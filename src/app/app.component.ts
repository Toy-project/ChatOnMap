import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: string;

  constructor(
    public storage: Storage,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    // public memberProvider: MemberProvider,
    // public aithProvider: AuthProvider
  ) {
    this.setRootPage();
  }

  async setRootPage() {
    const authMember = await this.storage.get('member');
    if (authMember) {
      this.rootPage = 'TabsPage';
    } else {
      this.rootPage = 'LoginPage';
    }
  }

  openTutorial() {
    // todo
    // this.nav.setRoot(TutorialPage);
  }

  platformReady() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
