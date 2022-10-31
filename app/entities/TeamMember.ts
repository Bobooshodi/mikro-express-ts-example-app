import {Collection, Entity, OneToMany, Property} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { SocialMediaAccount } from "./SocialMediaAccount";

@Entity()
export class TeamMember extends BaseEntity {

  @Property()
  public firstName!: string;

  @Property()
  public lastName!: string;

  @Property()
  public fullName!: string;

  @Property()
  public designation!: string;

  @Property()
  public image!: string;

  @OneToMany(() => SocialMediaAccount, account => account.teamMember, { orphanRemoval: true })
  socials? = new Collection<SocialMediaAccount>(this);

  constructor() {
    super();
  }
}
