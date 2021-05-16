import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../service/crud.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass']
})
export class PersonListComponent implements OnInit {

  Person: any = [];
  searchNome: string = '';

  settings = {
    columns: {
      id: {
        title: 'Id',
        filter: false
      },
      nome: {
        title: 'Nome',
        filter: false
      },
      dataNascimento: {
        title: 'Data de Nascimento',
        filter: false,
        valuePrepareFunction: (dataNascimento: any) => {
          let date = new Date(dataNascimento);
          return this.datePipe.transform(new Date(date.setDate(date.getDate() + 1)), 'dd/MM/yyyy');
        }
      },
      endereco: {
        title: 'Endereço',
        filter: false
      },
      cpf: {
        title: 'CPF',
        filter: false
      },
      fone: {
        title: 'Fone',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      obs: {
        title: 'OBS',
        filter: false
      }
    },
    mode: 'external',
    hideSubHeader: true,
    edit: {
      editButtonContent: '<i class="far fa-edit"></i> Editar',
      inputClass: 'btn'
    },
    delete: {
      deleteButtonContent: '<i class="far fa-trash-alt"></i> Excluir',
    },
    actions: {
      columnTitle: 'Ações',
      position: 'right'
    }
  }

  constructor(
    private crudService: CrudService,
    private router: Router,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.crudService.GetPeople().subscribe(res => {
      this.Person = res;
    });
  }

  search() {
    this.crudService.SearchByName(this.searchNome).subscribe(res => {
      this.Person = res;
    })
  }

  reset() {
    this.crudService.GetPeople().subscribe(res => {
      this.Person = res;
    });
  }

  formatDate(date: string) {
    let data = new Date(date);
    return new Date(data.setDate(data.getDate() + 1))
  }

  onEdit($event: any) {
    this.router.navigate([`/edit-people/${$event.data.id}`]);
  }

  onDelete($event: any) {
    this.delete($event.data.id, $event.index);
  }

  delete(id: any, i:any) {
    if (window.confirm('Você quer proceguir?')) {
      this.crudService.deletePerson(id).subscribe((res) => {
        this.Person.splice(i, 1);
      })
    }
  }

}
