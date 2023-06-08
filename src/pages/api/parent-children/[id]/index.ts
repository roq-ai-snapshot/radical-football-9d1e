import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { parentChildValidationSchema } from 'validationSchema/parent-children';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.parent_child
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getParentChildById();
    case 'PUT':
      return updateParentChildById();
    case 'DELETE':
      return deleteParentChildById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getParentChildById() {
    const data = await prisma.parent_child.findFirst(convertQueryToPrismaUtil(req.query, 'parent_child'));
    return res.status(200).json(data);
  }

  async function updateParentChildById() {
    await parentChildValidationSchema.validate(req.body);
    const data = await prisma.parent_child.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteParentChildById() {
    const data = await prisma.parent_child.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
