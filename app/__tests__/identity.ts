import base64 from "base-64";
import { encode, parse } from "es-cookie";
import moment from "moment";
import { getUser, IdentityError, isUser } from "../identity";

test("can parse empty cookie string", () => {
  const err = getUser("");
  if (isUser(err)) {
    return;
  }
  expect(IdentityError[err]).toBe(IdentityError[IdentityError.NotLoggedIn]);
});

test("identifies cookie with future expiry date", () => {
  const timestamp = moment()
    .endOf("month")
    .format("x");
  const cookies = fakeSCCookie(parseInt(timestamp, 10));

  const user = getUser(cookies);

  expect(isUser(user)).toBe(true);
});

test("identifies expired cookie", () => {
  const timestamp = moment()
    .startOf("day")
    .format("x");
  const cookies = fakeSCCookie(parseInt(timestamp, 10));

  const user = getUser(cookies);

  if (isUser(user)) {
    return;
  }
  expect(IdentityError[user]).toBe(IdentityError[IdentityError.Expired]);
});

test("cookie that's not base64 decodable", () => {
  const guu = encode("GU_U", "aaaa", {});
  const sc = encode("SC_GU_U", "a", {});
  const cookies = `${guu}; ${sc}`;

  const user = getUser(cookies);

  if (isUser(user)) {
    return;
  }
  expect(IdentityError[user]).toBe(IdentityError[IdentityError.CouldNotParse]);
});

test("cookie that's not json", () => {
  const guu = encode("GU_U", "aaaa", {});
  const sc = encode("SC_GU_U", `${base64.encode("hello")}.a`, {});
  const cookies = `${guu}; ${sc}`;

  const user = getUser(cookies);

  if (isUser(user)) {
    return;
  }
  expect(IdentityError[user]).toBe(IdentityError[IdentityError.CouldNotParse]);
});

test("something about identity", () => {
  const guu = encode("GU_U", "aaaa", {});
  const sc = encode(
    "SC_GU_U",
    `${base64.encode(JSON.stringify([{ not: "an array" }]))}.a`,
    {}
  );
  const cookies = `${guu}; ${sc}`;

  const user = getUser(cookies);

  if (isUser(user)) {
    return;
  }
  expect(IdentityError[user]).toBe(IdentityError[IdentityError.CouldNotParse]);
});

const fakeSCCookie = (timestamp: number) => {
  const data = ["id", timestamp];
  const stringified = JSON.stringify(data);
  const encoded = base64.encode(stringified);
  const sc = `${encoded}.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
  const gu = `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
  return `${encode("GU_U", gu, {})}; ${encode("SC_GU_U", sc, {})}`;
};
