import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { BaseEntity, Page } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const pages = await DI.pageRepository.findAll({
    orderBy: { name: QueryOrder.DESC },
    limit: 20,
  });
  res.json(pages);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const page = await DI.pageRepository.findOne(req.params.id);

    if (!page) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(page);
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
    const page = DI.em.create(Page, req.body);
    await DI.pageRepository.persist(page).flush();

    res.json(page);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const page = await DI.pageRepository.findOne(req.params.id);

    if (!page) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(page).assign(req.body);
    await DI.pageRepository.flush();

    res.json(page);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const PricePlanFeaturesController = router;
