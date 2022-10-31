import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Service extends BaseEntity {

  @Property()
  public icon!: string;

  @Property()
  public title!: string;

  @Property()
  public description!: string;

  constructor() {
    super();
  }
}
