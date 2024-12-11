module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@react-native-async-storage/async-storage': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    '@react-native-community/netinfo': '<rootDir>/__mocks__/@react-native-community/netinfo.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native|@react-navigation|@react-native-async-storage/async-storage|@react-native-community/netinfo)']
,  cacheDirectory: '.jest/cache',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  clearMocks: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
};
