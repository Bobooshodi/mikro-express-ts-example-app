import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { Vendor } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const vendors = await DI.vendorRepository.findAll({
    orderBy: { name: QueryOrder.DESC },
    limit: 20,
  });
  res.json(vendors);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const vendor = await DI.vendorRepository.findOne(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(vendor);
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
    const vendor = DI.em.create(Vendor, req.body);
    await DI.vendorRepository.persist(vendor).flush();

    res.json(vendor);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const vendor = await DI.vendorRepository.findOne(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(vendor).assign(req.body);
    await DI.vendorRepository.flush();

    res.json(vendor);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const vendorsController = router;
