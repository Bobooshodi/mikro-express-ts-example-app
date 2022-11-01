import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Vendor extends BaseEntity {

  @Property()
  public name!: string;

  @Property()
  public logo!: string;

  constructor() {
    super();
  }
}
