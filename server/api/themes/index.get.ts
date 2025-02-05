import { UserTheme } from "~/server/database/schemas/user.schema";

export default defineEventHandler(async (event) => {
  const result = UserTheme.enumValues.map((e) => ({
    value: e,
    label: e,
  }));
  return result;
});