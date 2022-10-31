import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { ApplicationDetail } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const appDetails = await DI.applicationDetailRepository.findAll({
    populate: ['socials'],
    limit: 20,
  });
  res.json(appDetails);
});

router.get('/:id', async (req: Request, res: Response) => {
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
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.title || !req.body.author) {
    res.status(400);
    return res.json({ message: 'One of `title, author` is missing' });
  }

  try {
    const appDetail = DI.em.create(ApplicationDetail, req.body);
    await DI.applicationDetailRepository.persist(appDetail).flush();

    res.json(appDetail);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
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
});

export const ApplicationDetailsController = router;
