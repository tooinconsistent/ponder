import fs from "fs";
import setupWasm from "argon2id/lib/setup.js";

// point to compiled binaries
const SIMD_FILENAME = "./node_modules/argon2id/dist/simd.wasm";
const NON_SIMD_FILENAME = "./node_modules/argon2id/dist/no-simd.wasm";

const argon2id = await setupWasm(
  (importObject) =>
    WebAssembly.instantiate(fs.readFileSync(SIMD_FILENAME), importObject),
  (importObject) =>
    WebAssembly.instantiate(fs.readFileSync(NON_SIMD_FILENAME), importObject)
);

export const hash = (password: string) => {
  const encoder = new TextEncoder();
  const encodedPassword = encoder.encode(password);

  const salt = crypto.getRandomValues(new Uint8Array(32));

  const parallelism = 4;
  const passes = 8;
  const memorySize = 2 ** 16;
  const tagLength = 32;

  const hash = argon2id({
    password: encodedPassword,
    salt,
    parallelism,
    passes,
    memorySize,
    tagLength,
  });

  const encodedHash = Buffer.from(hash).toString("base64").replaceAll("=", "");
  const encodedSalt = Buffer.from(salt).toString("base64").replaceAll("=", "");

  return `$argon2id$v=19$m=${memorySize},t=${passes},p=${parallelism}$${encodedSalt}$${encodedHash}`;
};

const hashRegex =
  /^\$argon2id\$v=19\$m=(?<memorySize>\d+),t=(?<passes>\d+),p=(?<parallelism>\d+)\$(?<salt>\w+)\$(?<hash>\w+)$/;
export const verify = (storedHash: string, password: string) => {
  const storedParams = hashRegex.exec(storedHash);
  if (!storedParams?.groups) {
    throw new Error("Invalid hash passed");
  }

  const encoder = new TextEncoder();
  const encodedPassword = encoder.encode(password);

  const salt = Uint8Array.from(
    Buffer.from(storedParams.groups.salt!, "base64")
  );

  const passwordHash = argon2id({
    password: encodedPassword,
    salt,
    parallelism: Number(storedParams.groups.parallelism),
    passes: Number(storedParams.groups.passes),
    memorySize: Number(storedParams.groups.memorySize),
    tagLength: 32,
  });

  const encodedPasswordHash = Buffer.from(passwordHash)
    .toString("base64")
    .replaceAll("=", "");

  return encodedPasswordHash === storedParams.groups.hash;
};
