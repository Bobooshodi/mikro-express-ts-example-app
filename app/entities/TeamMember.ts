import {Collection, Entity, OneToMany, Property} from '@mikro-orm/core';
import { SocialMediaAccount } from "./SocialMediaAccount";
import { User } from "./User";

@Entity()
export class TeamMember extends User {

  @Property()
  public designation!: string;

  @OneToMany(() => SocialMediaAccount, account => account.teamMember, { orphanRemoval: true })
  socials? = new Collection<SocialMediaAccount>(this);

  constructor() {
    super();
  }
}
