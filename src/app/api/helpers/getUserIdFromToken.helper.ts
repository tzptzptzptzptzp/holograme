import { createClient } from "@/libs/supabase/server.lib";

export async function getUserIdFromToken(token: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new Error("Invalid token");
  }
  return data.user.id;
}
