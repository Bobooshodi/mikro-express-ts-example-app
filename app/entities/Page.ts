import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Page extends BaseEntity {

  @Property()
  public name!: string;

  @Property()
  public title!: string;

  @Property()
  public description!: string;

  constructor() {
    super();
  }
}
