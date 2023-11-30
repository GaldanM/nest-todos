export default [
	{
		parser: "@typescript-eslint/parser",
		parserOptions: {
			project: "tsconfig.json",
			tsconfigRootDir: __dirname,
			sourceType: "module",
		},
		plugins: ["@typescript-eslint/eslint-plugin"],
		extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
		root: true,
		env: {
			node: true,
			jest: true,
		},
		ignorePatterns: [".eslintrc.mjs"],
		overrides: [
			{
				files: ["*.spec.ts", "*.test.ts", "*.step.ts"],
				plugins: ["vitest"],
				extends: ["plugin:vitest/recommended"],
			},
		],
	},
]
