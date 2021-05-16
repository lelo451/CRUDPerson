import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../service/crud.service';
import {cpf} from 'cpf-cnpj-validator';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.sass']
})
export class PersonDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  cpfMsg: boolean | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.updateForm = this.formBuilder.group({
      nome: [''],
      dataNascimento: [''],
      endereco: [''],
      cpf: [''],
      fone: [''],
      email: [''],
      obs: ['']
    })

    this.crudService.GetPerson(this.getId).subscribe(res => {
      let date = new Date(res['dataNascimento']);
      this.updateForm.setValue({
        nome: res['nome'],
        dataNascimento: new Date(date.setDate(date.getDate() + 1)),
        endereco: res['endereco'],
        cpf: res['cpf'],
        fone: res['fone'],
        email: res['email'],
        obs: res['obs']
      });
    });
  }

  ngOnInit(): void {
  }

  isFieldPristine(field: string) {
    return this.updateForm.get(field)?.pristine;
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

  onUpdate(): any {
    this.crudService.updatePerson(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/people-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
