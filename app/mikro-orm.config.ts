import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import {
  ApplicationDetail,
  Page,
  PricePlan,
  PricePlanFeature,
  Service,
  SocialMediaAccount,
  TeamMember,
  Testimonial,
  Vendor,
  BaseEntity,
  User
} from './entities';

const options: Options = {
  type: 'mongo',
  entities: [ApplicationDetail, Page, PricePlan, PricePlanFeature, Service, SocialMediaAccount, TeamMember, Testimonial, User, Vendor, BaseEntity],
  dbName: 'ooneprofessionals-api',
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: process.env.MONGODB_URI
};

export default options;
