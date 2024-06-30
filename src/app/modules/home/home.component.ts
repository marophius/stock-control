import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SignUpUserRequest } from '../../models/interfaces/user/signup.user.request';
import { AuthRequest } from '../../models/interfaces/user/auth/auth.request';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public loginCard: boolean = true;
  public loginForm = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', {
      validators: [Validators.required]
    }]
  });

  public signUpForm = this.fb.group({
    name: ['', {
      validators: [Validators.required]
    }],
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', {
      validators: [Validators.required]
    }]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router) {

  }

  onSubmit(): void {
    if(this.loginForm.valid)
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response.name}`,
              life: 2000
            })
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer login`,
            life: 2000
          })
        }
      })
  }

  onSubmitSignUpForm(): void {
    if(this.signUpForm.valid){
      this.userService.signUpUser(this.signUpForm.value as SignUpUserRequest)
        .subscribe({
          next: (response) => {
            if(response){
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta ${response.name}`,
                life: 2000
              })
            this.signUpForm.reset();
            this.loginCard = true;
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao criar novo usuário`,
              life: 2000
            })
          }
        })
    }
  }
}
