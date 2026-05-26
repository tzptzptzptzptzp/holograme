import { auth } from "@/auth";

export async function getUserIdFromToken(_token: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Invalid token");
  }
  return session.user.id;
}
