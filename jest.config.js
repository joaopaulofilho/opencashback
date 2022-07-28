/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: [
		"js",
		"json",
		"ts",
		"node",
	],
	rootDir: "./",
	roots: [
		"<rootDir>/test",
		"<rootDir>/src"
	],
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
		"^test/(.*)$": "<rootDir>/test/$1"
	},
	testRegex: ".*\\.(e2e-|)spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	collectCoverageFrom: [
		"**/*.(t|j)s"
	],
	coverageDirectory: "./coverage",
};