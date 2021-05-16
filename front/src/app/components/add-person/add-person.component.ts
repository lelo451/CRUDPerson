import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CrudService} from '../../service/crud.service';
import {cpf} from 'cpf-cnpj-validator';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.sass']
})
export class AddPersonComponent implements OnInit {

  personForm: FormGroup;
  cpfMsg: boolean | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.personForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: [''],
      endereco: [''],
      cpf: [''],
      fone: [''],
      email: ['', [Validators.required, Validators.email]],
      obs: ['']
    })
  }


  isFieldValid(field: string) {
    return this.personForm.get(field)?.valid &&
      this.personForm.get(field)?.touched &&
      this.personForm.get(field)?.dirty;
  }

  isFieldPristine(field: string) {
    return this.personForm.get(field)?.pristine;
  }

  isCPFValid(n: string) {
    if (this.isFieldPristine('cpf')) {
      this.cpfMsg = true;
      return ''
    } else {
      if (cpf.isValid(n)) {
        this.cpfMsg = true;
        return 'is-valid';
      } else {
        this.cpfMsg = false;
        return 'is-invalid';
      }
    }
  }

  displayFieldCss(field: string) {
    if (!this.isFieldPristine(field)) {
      return {
        'is-invalid': !this.isFieldValid(field),
        'is-valid': this.isFieldValid(field)
      };
    } else {
      return '';
    }
  }

  ngOnInit(): void { }

  reset(): any {
    this.personForm.reset();
  }

  onSubmit(): any {
    this.crudService.AddPerson(this.personForm.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/people-list'))
      }, (err) => {
          console.log(err)
        }
      )
  }
}
