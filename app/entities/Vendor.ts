import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Vendor extends BaseEntity {

  @Property()
  public name!: string;

  @Property()
  public image!: string;

  constructor() {
    super();
  }
}
