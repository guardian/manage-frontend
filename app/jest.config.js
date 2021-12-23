module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
  testResultsProcessor: "jest-teamcity-reporter",
  snapshotSerializers: ["@emotion/jest/serializer"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
        module: "commonjs",
      },
      babelConfig: {
        presets: [
          "@babel/typescript",
          [
            "@babel/preset-react",
            { runtime: "automatic", importSource: "@emotion/react" },
          ],
        ],
        plugins: [
          "@babel/proposal-class-properties",
          "@babel/proposal-object-rest-spread",
          "@babel/plugin-proposal-optional-chaining",
          "@emotion/babel-plugin",
          "lodash",
        ],
      },
    },
  },
  moduleNameMapper: {
    "^@guardian/src-foundations/(.*)(?<!cjs)$":
      "@guardian/src-foundations/$1/cjs",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
};
