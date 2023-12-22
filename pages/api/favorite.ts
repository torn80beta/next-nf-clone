import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req);
  try {
    if (req.method === "POST") {
      // console.log("PRE AUTH CHECK");
      // console.log(req.method);
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      // console.log(currentUser);

      const existingMovie = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await prisma.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;

      const existingMovie = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prisma.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });
      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
