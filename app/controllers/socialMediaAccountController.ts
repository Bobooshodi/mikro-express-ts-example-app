import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { SocialMediaAccount } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const accounts = await DI.socialMediaAccountRepository.findAll({
    populate: ['teamMember', 'application'],
    orderBy: { name: QueryOrder.DESC },
    limit: 20,
  });
  res.json(accounts);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const account = await DI.socialMediaAccountRepository.findOne(req.params.id, {
      populate: ['teamMember', 'application'],
    });

    if (!account) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(account);
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
    const account = DI.em.create(SocialMediaAccount, req.body);
    wrap(account.application, true).__initialized = true;
    wrap(account.teamMember, true).__initialized = true;
    await DI.socialMediaAccountRepository.persist(account).flush();

    res.json(account);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const account = await DI.socialMediaAccountRepository.findOne(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(account).assign(req.body);
    await DI.socialMediaAccountRepository.flush();

    res.json(account);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const SocialMediaAccountController = router;
