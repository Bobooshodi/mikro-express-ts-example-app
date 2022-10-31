import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { SocialMediaAccount } from "./SocialMediaAccount";

@Entity()
export class ApplicationDetail extends BaseEntity {

  @Property()
  public businessName!: string;

  @Property()
  public businessAddress!: string;

  @Property({ nullable: true })
  phoneNumber: string;

  @Property()
  mobileNumber!: string;

  @Property()
  emailAddress!: string;

  @Property()
  aboutBusiness!: string;

  @Property({ nullable: true })
  businessSellingPoints?: string[];

  @OneToMany(() => SocialMediaAccount, account => account.application, { orphanRemoval: true })
  socials? = new Collection<SocialMediaAccount>(this);

  constructor() {
    super();
  }
}
