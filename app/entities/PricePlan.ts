import {Cascade, Collection, Entity, ManyToMany, ManyToOne, Property} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { PricePlanFeature } from "./PricePlanFeature";

@Entity()
export class PricePlan extends BaseEntity {

  @Property()
  public name!: string;

  @Property()
  public price!: number;

  @Property()
  public description!: string;

  @ManyToMany(() => PricePlanFeature)
  features = new Collection<PricePlanFeature>(this);

  constructor() {
    super();
  }
}
