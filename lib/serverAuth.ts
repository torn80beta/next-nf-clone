import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req);
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);
  // console.log("BOOOOOOOO!!!!!");
  // console.log(session?.user?.email);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
