export const getCookie = (name: string): string | null => {
  const cookies: string[] = document?.cookie
    .split(";")
    .filter(keyValue => keyValue.trim().startsWith(name + "="));

  return cookies.length ? cookies[0].replace(name + "=", "") : null;
};
