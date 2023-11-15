import type { PrismaClient } from "@prisma/client";
// import type { MongoClient } from "mongodb";

/*  */
// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

/*  */

declare global {
  namespace globalThis {
    // var prismadb: PrismaClientSingleton | undefined;
    var prisma: PrismaClient;
  }
}
