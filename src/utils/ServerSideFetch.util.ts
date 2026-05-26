import { headers } from "next/headers";
import { ofetch } from "ofetch";

export const ServerSideFetch = async () => {
  const requestHeaders = await headers();
  const apiFetch = ofetch.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 100000,
    onRequest({ options }) {
      options.headers = new Headers(requestHeaders as any);
    },
  });
  return { apiFetch };
};
