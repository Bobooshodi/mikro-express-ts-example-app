import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Testimonial extends BaseEntity {

  @Property()
  public clientName!: string;

  @Property()
  public profession!: string;

  @Property()
  public testimony!: string;

  constructor() {
    super();
  }
}
