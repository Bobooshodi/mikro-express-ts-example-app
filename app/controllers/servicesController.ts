import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { Service } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const services = await DI.serviceRepository.findAll({
    orderBy: { title: QueryOrder.DESC },
    limit: 20,
  });
  res.json(services);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await DI.serviceRepository.findOne(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(service);
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
    const service = DI.em.create(Service, req.body);
    await DI.serviceRepository.persist(service).flush();

    res.json(service);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const service = await DI.serviceRepository.findOne(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(service).assign(req.body);
    await DI.serviceRepository.flush();

    res.json(service);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const servicesController = router;
