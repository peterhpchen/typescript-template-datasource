module.exports = {
  verbose: true,
  "testURL": "http://localhost/",
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.jest.json"
    }
  },
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    'app/plugins/sdk': '<rootDir>/node_modules/grafana-sdk-mocks/app/plugins/sdk.ts',
  },
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/(?!grafana-sdk-mocks)",
  ],
  "transform": {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(\\.|/)([jt]est)\\.ts$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ]
};
