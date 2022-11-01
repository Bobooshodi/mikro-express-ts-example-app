import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {

  @Property()
  public firstName!: string;

  @Property()
  public lastName!: string;

  @Property({ nullable: true })
  public image: string;

  @Property()
  public email!: string;

  @Property()
  public password!: string;

  constructor() {
    super();
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
