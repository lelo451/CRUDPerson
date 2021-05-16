import {Entity, model, property} from '@loopback/repository';

@model()
export class Person extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'date',
    required: true,
    jsonSchema: {
      format: 'date',
    },
  })
  dataNascimento: string;

  @property({
    type: 'string',
    required: true,
  })
  endereco: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  cpf: string;

  @property({
    type: 'string',
    required: true,
  })
  fone: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
  })
  obs?: string;


  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
