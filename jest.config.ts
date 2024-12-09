export default {
  rootDir: "./apps/api",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s", "!**/node_modules/**"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
};
