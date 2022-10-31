import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { ApplicationDetail, Page, PricePlan, PricePlanFeature, Service, SocialMediaAccount, TeamMember, Testimonial, Vendor, BaseEntity } from './entities';

const options: Options = {
  type: 'mongo',
  entities: [ApplicationDetail, Page, PricePlan, PricePlanFeature, Service, SocialMediaAccount, TeamMember, Testimonial, Vendor, BaseEntity],
  dbName: 'mikro-orm-express-ts',
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: process.env.MONGODB_URI
};

export default options;
