import { genSalt, hash } from 'bcrypt' // Либа для хешей паролей
import { db, UserSchema, UserSchemaInsert, UserSchemaSelect, UserPreferences, UserPreferencesInsert } from '~/server/database';
import { eq,or } from 'drizzle-orm';
import { validateEmail } from '~/utils/checkFunctions';

interface ICreateUser{ 
  username: string,
  name: string,
  email: string,
  password: string,
  isAdmin?: boolean,
  theme: 'Fire'| 'Water'| 'Earth'| 'Air'| 'Light'| 'Shadow'|'Ice'| 'Metal'| 'Spirit',
  distribution:boolean,
}

interface IUserPreferences{
    emailUpdates: boolean,
    userId?: string,
    theme: 'Fire'| 'Water'| 'Earth'| 'Air'| 'Light'| 'Shadow'|'Ice'| 'Metal'| 'Spirit',
    createdAt: Date,
    updatedAt: Date,
}


export default defineEventHandler(async (event) => {
  const body: ICreateUser = await readBody(event);

  const salt: string = await genSalt(10);

  const passwordHash: string = await hash(body.password, salt);
  
  const candidate = {
    username: body.username,
    name: body.name,
    email: body.email,
    passwordHash: passwordHash, 
    isAdmin: body.isAdmin,
  };

  const findUser: UserSchemaSelect = (await db
    .select()
    .from(UserSchema) 
    .where(or(eq(UserSchema.username, body.username), eq(UserSchema.email, body.email)))
    .limit(1) 
    .execute())[0]
  
  if (!validateEmail(body.email)) {
    return createError({
      statusCode: 400,
      message: 'Email is invalid.',
    });
  }

  if (findUser) {
    return createError({
      statusCode: 400, 
      message: 'User with this name or email already exist', 
    });
  }
  
  const [user]: UserSchemaInsert[] = await db.insert(UserSchema).values({ ...candidate }).returning();
  

  const preferences: IUserPreferences = {
    userId: user.id,
    theme: body.theme,
    emailUpdates: body.distribution,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [userPreferences]: UserPreferencesInsert[] = await db.insert(UserPreferences).values(preferences).returning();

  // db.insert(UserSchema) - указывает, что мы вставляем данные в таблицу, связанную с UserSchema
  // .values({...candidate}) - передаем объект с данными для вставки (имя пользователя, хэш пароля и флаг администратора)
  // "passwordHash: _" - исключаем поле passwordHash, так как оно нам не нужно в возвращаемом объекте
  // "result" будет содержать все остальные данные пользователя
  const { passwordHash: _, ...result} = user
  
  return { ...result, settings: { ...userPreferences } }; 
});