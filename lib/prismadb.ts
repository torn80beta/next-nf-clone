import { PrismaClient } from "@prisma/client";

// const client = global.prismadb || new PrismaClient();
let client;

// if (process.env.NODE_ENV === "production") global.prismadb = client;

if (process.env.NODE_ENV === "production") {
  client = new PrismaClient();
} else {
  if (!global.prismadb) {
    global.prismadb = new PrismaClient();
  }

  client = global.prismadb;
}

export default client;
