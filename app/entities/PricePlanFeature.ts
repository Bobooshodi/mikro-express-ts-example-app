import {Collection, Entity, ManyToMany, Property} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { PricePlan } from "./PricePlan";

@Entity()
export class PricePlanFeature extends BaseEntity {

  @Property()
  public feature!: string;

  @Property()
  public included!: boolean;

  @ManyToMany(() => PricePlan, p => p.features)
  pricePlans: Collection<PricePlan> = new Collection<PricePlan>(this);

  constructor() {
    super();
  }
}
