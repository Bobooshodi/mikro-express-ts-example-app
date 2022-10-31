import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import * as dotenv from 'dotenv'

dotenv.config();

import {ApplicationDetailsController, SocialMediaAccountController} from './controllers';
import { ApplicationDetail, Page, PricePlan, PricePlanFeature, Service, SocialMediaAccount, TeamMember, Testimonial, Vendor } from './entities';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  applicationDetailRepository: EntityRepository<ApplicationDetail>,
  pageRepository: EntityRepository<Page>,
  pricePlanRepository: EntityRepository<PricePlan>,
  pricePlanFeatureRepository: EntityRepository<PricePlanFeature>,
  serviceRepository: EntityRepository<Service>,
  socialMediaAccountRepository: EntityRepository<SocialMediaAccount>,
  teamMemberRepository: EntityRepository<TeamMember>,
  testimonialRepository: EntityRepository<Testimonial>,
  vendorRepository: EntityRepository<Vendor>
};

export const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.applicationDetailRepository = DI.orm.em.getRepository(ApplicationDetail);
  DI.pageRepository = DI.orm.em.getRepository(Page);
  DI.pricePlanRepository = DI.orm.em.getRepository(PricePlan);
  DI.pricePlanFeatureRepository = DI.orm.em.getRepository(PricePlanFeature);
  DI.serviceRepository = DI.orm.em.getRepository(Service);
  DI.socialMediaAccountRepository = DI.orm.em.getRepository(SocialMediaAccount);
  DI.teamMemberRepository = DI.orm.em.getRepository(TeamMember);
  DI.testimonialRepository = DI.orm.em.getRepository(Testimonial);
  DI.vendorRepository = DI.orm.em.getRepository(Vendor);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  app.use('/app-details', ApplicationDetailsController);
  app.use('/socials', SocialMediaAccountController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();
