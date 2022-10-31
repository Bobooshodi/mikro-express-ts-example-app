import {Cascade, Entity, ManyToOne, Property} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { ApplicationDetail } from "./ApplicationDetail";
import {TeamMember} from "./TeamMember";

@Entity()
export class SocialMediaAccount extends BaseEntity {

  @Property()
  public name!: string;

  @Property()
  public url!: string;

  @Property({ nullable: true })
  username?: string;

  @ManyToOne(() => ApplicationDetail, { cascade: [Cascade.PERSIST], nullable: true })
  application?: ApplicationDetail;

  @ManyToOne(() => TeamMember, { cascade: [Cascade.PERSIST], nullable: true })
  teamMember?: TeamMember;

  constructor() {
    super();
  }
}
