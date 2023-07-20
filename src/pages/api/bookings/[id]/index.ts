import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { bookingValidationSchema } from 'validationSchema/bookings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.booking
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBookingById();
    case 'PUT':
      return updateBookingById();
    case 'DELETE':
      return deleteBookingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBookingById() {
    const data = await prisma.booking.findFirst(convertQueryToPrismaUtil(req.query, 'booking'));
    return res.status(200).json(data);
  }

  async function updateBookingById() {
    await bookingValidationSchema.validate(req.body);
    const data = await prisma.booking.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBookingById() {
    const data = await prisma.booking.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
