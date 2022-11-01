import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { PricePlanFeature } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const features = await DI.pricePlanFeatureRepository.findAll({
    orderBy: { feature: QueryOrder.DESC },
    limit: 20,
  });
  res.json(features);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const feature = await DI.pricePlanFeatureRepository.findOne(req.params.id);

    if (!feature) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(feature);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.url) {
    res.status(400);
    return res.json({ message: 'One of `title, author` is missing' });
  }

  try {
    const feature = DI.em.create(PricePlanFeature, req.body);
    await DI.pricePlanFeatureRepository.persist(feature).flush();

    res.json(feature);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const feature = await DI.pricePlanFeatureRepository.findOne(req.params.id);

    if (!feature) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(feature).assign(req.body);
    await DI.pricePlanFeatureRepository.flush();

    res.json(feature);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const featureFeaturesController = router;
