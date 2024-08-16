import { headers } from "next/headers";
import { ofetch } from "ofetch";

export const ServerSideFetch = () => {
  const apiFetch = ofetch.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 100000,
    onRequest({ options }) {
      options.headers = headers();
      options.headers = new Headers(options.headers);
      const cookieHeader = options.headers.get("cookie");

      if (cookieHeader) {
        const cookies = parseCookies(cookieHeader);
        const token = cookies["sb-qspbsvprtmxrgbanynyi-auth-token"].substring(
          "base64-".length
        );
        if (token) {
          const decodedToken: { access_token: string } = JSON.parse(
            atob(token)
          );
          options.headers.set(
            "Authorization",
            `Bearer ${decodedToken.access_token}`
          );
        }
      }
    },
  });
  return {
    apiFetch,
  };
};

const parseCookies = (cookieHeader: string) => {
  const cookies: { [key: string]: string } = {};
  const pairs = cookieHeader.split(/; */);

  for (let pair of pairs) {
    const [key, ...value] = pair.split("=");
    cookies[key.trim()] = decodeURIComponent(value.join("="));
  }

  return cookies;
};
