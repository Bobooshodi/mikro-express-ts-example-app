import { Request, Response } from 'express';
import { wrap } from '@mikro-orm/core';

import { DI } from '../server';
import { ApplicationDetail } from '../entities';

export const getAppDetails = async (req: Request, res: Response) => {
  const appDetails = await DI.applicationDetailRepository.findAll({
    populate: ['socials'],
    limit: 20,
  });
  res.json(appDetails);
};

export const getAppDetail = async (req: Request, res: Response) => {
  try {
    const appDetail = await DI.applicationDetailRepository.findOne(req.params.id, {
      populate: ['socials'],
    });

    if (!appDetail) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(appDetail);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const createAppDetail = async (req: Request, res: Response) => {
  const { businessName, businessAddress, mobileNumber, emailAddress, aboutBusiness } = req.body;
  if (!businessName || !businessAddress ||!mobileNumber || !emailAddress || !aboutBusiness) {
    res.status(400);
    return res.json({ message: 'One of `businessName, businessAddress, mobileNumber, emailAddress, aboutBusiness` is missing' });
  }

  try {
    const appDetail = DI.em.create(ApplicationDetail, req.body);
    await DI.applicationDetailRepository.persist(appDetail).flush();

    res.json(appDetail);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const updateAppDetail = async (req: Request, res: Response) => {
  try {
    const appDetail = await DI.applicationDetailRepository.findOne(req.params.id);

    if (!appDetail) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(appDetail).assign(req.body);
    await DI.applicationDetailRepository.flush();

    res.json(appDetail);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};
