import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '@app/services';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  imports: [ReactiveFormsModule, DrawerModule, InputTextModule, ButtonModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  // private _authService = inject(Auth);
  private _router = inject(Router);
  private _supabaseService = inject(Supabase);
  currentUser = signal<any>(null);
  visible: boolean = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }
  async ngOnInit() {
    const user = await this._supabaseService.getUser();
    this.currentUser.set(user);
  }
  async onLogin() {
    try {
      const { email, password } = this.form.getRawValue();
      this.form.markAsPending();
      // const user = await this._authService.login({
      //   email: email,
      //   password: password,
      // });

      // if (user.user.user_metadata['role'] == 'admin') {
      //   await this._router.navigateByUrl('/admin');
      // } else {
      //   await this._router.navigateByUrl('/');
      // }
    } catch (error) {
      // this._toastService.error(
      //   this._translateService.instant('login.errors.invalidCredentials')
      // );
    } finally {
      // this.isLoading = false;
    }
  }
}
