import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import * as dotenv from 'dotenv'
import passport  from "passport";
import cors from 'cors';

dotenv.config();

import { SocialMediaAccountController} from './controllers';
import {
  ApplicationDetail,
  Page,
  PricePlan,
  PricePlanFeature,
  Service,
  SocialMediaAccount,
  TeamMember,
  Testimonial,
  User,
  Vendor
} from './entities';
import { ApplicationDetailRouter, AuthRouter } from "./routes";

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
  userRepository: EntityRepository<User>,
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
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.vendorRepository = DI.orm.em.getRepository(Vendor);

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.use('/', AuthRouter);
  app.use('/app-details', passport.authenticate('jwt', { session: false }), ApplicationDetailRouter);
  app.use('/socials', passport.authenticate('jwt', { session: false }), SocialMediaAccountController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();
