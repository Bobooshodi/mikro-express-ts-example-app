import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { ApplicationDetail, Page, PricePlan, PricePlanFeature, Service, SocialMediaAccount, TeamMember, Testimonial, Vendor, BaseEntity } from './entities';

const options: Options = {
  type: 'mongo',
  entities: [ApplicationDetail, Page, PricePlan, PricePlanFeature, Service, SocialMediaAccount, TeamMember, Testimonial, Vendor, BaseEntity],
  dbName: 'mikro-orm-express-ts',
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: 'mongodb://mongoadmin:cGNtVC8TMyjHhyYY9Ccjpu2bBQahuDq6@139.180.138.118:27017/?authMechanism=DEFAULT&authSource=admin'
};

export default options;
