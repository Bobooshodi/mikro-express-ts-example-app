import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { Testimonial } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const testimonials = await DI.testimonialRepository.findAll({
    orderBy: { clientName: QueryOrder.ASC },
    limit: 20,
  });
  res.json(testimonials);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await DI.testimonialRepository.findOne(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(testimonial);
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
    const testimonial = DI.em.create(Testimonial, req.body);
    await DI.testimonialRepository.persist(testimonial).flush();

    res.json(testimonial);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await DI.testimonialRepository.findOne(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(testimonial).assign(req.body);
    await DI.testimonialRepository.flush();

    res.json(testimonial);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const TestimonialsController = router;
