import { db } from "../db";
import { users } from "../db/schema";

export async function postUser(
  id: string,
  name: string,
  email: string,
  image: string
) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.email, email),
  });
  if (!user) {
    await db.insert(users).values({ id, name, email, image });
  }
}

export async function getUser(email: string) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.email, email),
    orderBy: (model, { desc }) => desc(model.email),
  });

  return user;
}
