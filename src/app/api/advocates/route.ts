import { ilike, or } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const queryParams = new URL(request.url).searchParams;
  const searchTerm = queryParams.get('searchTerm') || '';

  const data = await db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
      )
    );

  return Response.json({ data });
}
