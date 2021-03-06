import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { userNamePasswordValidator } from './username-password.validator';

@Component({
  // Como tem o escopo de página, não possui um 'selector'
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailImput') emailImput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) {}

  ngOnInit() {
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
          lowerCaseValidator, // Antes de ter um validator customizado era: Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(18)
        ]
      ]
    }, {
      // Validação Cross-Field (Campo depende do valor de outro)
      validator: userNamePasswordValidator
    });

    // tslint:disable-next-line:no-unused-expression // seta o foco no elemento da página se está no Browser
    this.platformDetectorService.ehPlataformaBrowser() &&
      this.emailImput.nativeElement.focus();
  }

  signUp() {
    // Teste para submeter apenas se todos os campos são válidos
    if (this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signUpService
        .signUp(newUser)
        .subscribe(
            () => this.router.navigate(['']),
            err => console.log(err)
          );
    }
  }


}
