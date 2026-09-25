import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, EyeColor, Supabase } from '@app/services';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { SelectModule } from '@openng/optimus-ui/select';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { InputMaskModule } from '@openng/optimus-ui/inputmask';
import { dateValidator } from '@app/validators';
import { AvatarUploader } from '../ui';
import { EUserRole } from '@app/enums';

@Component({
  imports: [
    ReactiveFormsModule,
    DrawerModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    InputMaskModule,
    AvatarUploader,
  ],
  selector: 'app-auth',
  styleUrl: './auth.scss',
  templateUrl: './auth.html',
})
export class Auth implements OnInit {
  private _router = inject(Router);
  private _supabaseService = inject(Supabase);
  private _eyeColorService = inject(EyeColor);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);

  currentUser = signal<any>(null);
  visible = signal(false);
  view = signal<'login' | 'register'>('login');
  isRegisterLoading = signal(false);
  isLoginLoading = signal(false);

  bloodType = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  eyeColors = signal<any[]>([]);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', [Validators.required, dateValidator]),
    bloodType: new FormControl('', Validators.required),
    eyeColor: new FormControl('', Validators.required),
    vacationDays: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(45)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl(null, Validators.required),
  });

  async ngOnInit(): Promise<void> {
    const user = await this._supabaseService.getUser();
    const eyeColors = await this._eyeColorService.getList();

    this.currentUser.set(user);
    this.eyeColors.set(eyeColors);

    const { data } = this._supabaseService.authChanges((event, session) => {
      this.currentUser.set(session?.user ?? null);
    });

    this._destroyRef.onDestroy(() => {
      data.subscription.unsubscribe();
    });
  }

  getLoginFormControl(controlName: string) {
    return this.loginForm.get(controlName);
  }

  getRegisterFormControl(controlName: string) {
    return this.registerForm.get(controlName);
  }

  openDrawer(): void {
    this.visible.set(true);
  }

  goToRegister(): void {
    this.view.set('register');
  }

  backToLogin(): void {
    this.view.set('login');
  }

  close(): void {
    this.visible.set(false);
  }

  onHide(): void {
    this.view.set('login');
  }

  onfileSelected(file: any) {
    this.registerForm.patchValue({
      avatar: file,
    });
  }

  async onLogin() {
    try {
      const { email, password } = this.loginForm.getRawValue();

      this.loginForm.markAsPending();

      this.isLoginLoading.set(true);

      const user = await this._authService.login({
        email: email,
        password: password,
      });

      if (user.user.user_metadata['role'] == 'admin') {
        await this._router.navigateByUrl('/admin');
      } else {
        await this._router.navigateByUrl('/');
      }
    } catch {
    } finally {
      this.isLoginLoading.set(false);

      this.visible.set(false);
    }
  }

  async onRegister() {
    try {
      const data = this.registerForm.getRawValue();

      this.registerForm.markAsPending();

      this.isRegisterLoading.set(true);

      await this._authService.register(data, EUserRole.Customer);
    } catch {
    } finally {
      this.isRegisterLoading.set(false);

      this.visible.set(false);
    }
  }
}
