/* eslint-disable no-var */

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client =
  globalThis.prisma || new PrismaClient({ errorFormat: 'minimal' });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
