import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbConfigDataSource} from '../datasources';
import {Person, PersonRelations} from '../models';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {
  constructor(
    @inject('datasources.DbConfig') dataSource: DbConfigDataSource,
  ) {
    super(Person, dataSource);
  }
}
