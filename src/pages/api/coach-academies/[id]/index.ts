import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { coachAcademyValidationSchema } from 'validationSchema/coach-academies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.coach_academy
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCoachAcademyById();
    case 'PUT':
      return updateCoachAcademyById();
    case 'DELETE':
      return deleteCoachAcademyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCoachAcademyById() {
    const data = await prisma.coach_academy.findFirst(convertQueryToPrismaUtil(req.query, 'coach_academy'));
    return res.status(200).json(data);
  }

  async function updateCoachAcademyById() {
    await coachAcademyValidationSchema.validate(req.body);
    const data = await prisma.coach_academy.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteCoachAcademyById() {
    const data = await prisma.coach_academy.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
