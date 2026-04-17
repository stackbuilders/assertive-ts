import type { Config } from "jest";

const jestConfig: Config = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./test/setup.ts"],
  testEnvironment: "node",
  testRegex: "test/.*\\.test\\.ts$",
};

export default jestConfig;
