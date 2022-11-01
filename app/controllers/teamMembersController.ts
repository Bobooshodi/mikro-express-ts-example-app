import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { TeamMember } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const teamMembers = await DI.teamMemberRepository.findAll({
    orderBy: { firstName: QueryOrder.ASC },
    limit: 20,
  });
  res.json(teamMembers);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const teamMember = await DI.teamMemberRepository.findOne(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(teamMember);
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
    const teamMember = DI.em.create(TeamMember, req.body);
    await DI.teamMemberRepository.persist(teamMember).flush();

    res.json(teamMember);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const teamMember = await DI.teamMemberRepository.findOne(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(teamMember).assign(req.body);
    await DI.teamMemberRepository.flush();

    res.json(teamMember);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const TeamMembersController = router;
