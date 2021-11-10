module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testResultsProcessor: "jest-teamcity-reporter",
  snapshotSerializers: ["jest-emotion"],
  globals: {
    "ts-jest": {
      tsConfig: {
        jsx: "react",
        module: "commonjs"
      },
      babelConfig: require("./webpack.common").babelCommon
    }
  },
  moduleNameMapper: {
    "^@guardian/src-foundations/(.*)(?<!cjs)$":
      "@guardian/src-foundations/$1/cjs"
  }
};
