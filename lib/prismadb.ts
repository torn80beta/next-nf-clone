import { PrismaClient } from "@prisma/client";

// // const client = global.prismadb || new PrismaClient();

// // if (process.env.NODE_ENV === "production") global.prismadb = client;

// let client;

/* prisma client type fix  */

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/*  */

// if (process.env.NODE_ENV === "production") {
//   client = new PrismaClient();
// } else {
//   if (!global.prismadb) {
//     global.prismadb = new PrismaClient();
//   }

//   client = global.prismadb;
// }

// export default client;
