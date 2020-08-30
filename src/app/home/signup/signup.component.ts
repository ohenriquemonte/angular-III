import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { lowerCaseValidator } from "src/app/shared/validators/lower-case-validator";
import { userNotTakenValidatorService } from "./user-not-taken-validator.service";
import { NewUser } from "./new-user";
import { SignUpService } from "./signup.service";
import { Router } from "@angular/router";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";

@Component({
    templateUrl: './signup.component.html',
    providers: [
        userNotTakenValidatorService
    ]
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private platformDetectorService: PlatformDetectorService,
        private router: Router,
        private signUpService: SignUpService,
        private userNotTakenValidatorService: userNotTakenValidatorService,
    ) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    lowerCaseValidator, // Validators.pattern(/^[a-z0-9_\-]+$/), // expressao regular: permite começar com letra minuscula e ter numero no final 
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken() // terceiro array: validadores assíncronos
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        });

        this.platformDetectorService.isPlatformBrowser() &&
            this.emailInput.nativeElement.focus();
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService
            .signup(newUser)
            .subscribe(
                () => { this.router.navigate(['']) },
                err => { console.log(`signUpPage signup ${JSON.stringify(err)}`); }
            );
    }
}