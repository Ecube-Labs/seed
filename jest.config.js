module.exports = {
  verbose: true,
  testRegex: [".*\\.spec\\.ts$"],
  testPathIgnorePatterns: ["/node_modules/"],
  setupFiles: ["./jest.setup.js"],
  // setupFilesAfterEnv: [],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js"],
  moduleDirectories: ["node_modules"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
      diagnostics: true
    }
  },
  preset: "ts-jest",
  testMatch: null,
  testEnvironment: "node"
};
