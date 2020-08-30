import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth/auth.service";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;

    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private platformDetectorService: PlatformDetectorService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        this.authService
            .authenticate(userName, password)
            .subscribe(() => {
                // this.router.navigateByUrl(`user/${userName}`);
                this.router.navigate(['user', userName]);
            }, err => {
                console.error(`erro ao autenticar ${JSON.stringify(err)}`);
                this.loginForm.reset();

                this.platformDetectorService.isPlatformBrowser() &&
                    this.userNameInput.nativeElement.focus();

                alert(`Invalid username or password`);
            });
    }
}