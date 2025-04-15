import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import { db, UserPreferences, UserSchema } from "~/server/database";

interface IAuthData {
  email: string;
  password: string;
}

interface IResData {
  id: string,
  username: string,
  name: string,
  email: string,
  theme: 'Fire' | 'Water' | 'Earth' | 'Air' | 'Light' | 'Shadow' | 'Ice' | 'Metal' | 'Spirit' | null,
  passwordHash: string | null,
  isAdmin: boolean | null,
}

export default defineEventHandler(async (event) => {

  const body: IAuthData = await readBody(event);

  const findUser: IResData = (await db
    .select({
      id: UserSchema.id,
      username: UserSchema.username,
      name: UserSchema.name,
      email: UserSchema.email,
      theme: UserPreferences.theme,
      passwordHash: UserSchema.passwordHash,
      isAdmin: UserSchema.isAdmin,
    })
    .from(UserSchema)
    .leftJoin(UserPreferences, eq(UserPreferences.userId, UserSchema.id))
    .where(eq(UserSchema.email, body.email))
    .limit(1)
    .execute())[0];


  if (!findUser) {
    return createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  const comparePasswords: Promise<boolean> = await compare(body.password, findUser.passwordHash);

  if (!comparePasswords) {
    return createError({
      statusCode: 401,
      message: "Incorrect password",
    });
  }

  const { passwordHash, ...result } = findUser

  const session = await setUserSession(event, { user: { ...result } })

  return session;
});