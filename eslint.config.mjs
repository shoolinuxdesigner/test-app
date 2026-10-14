import { fixupPluginRules } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals.map((config) => {
    const flatConfig = { ...config };
    delete flatConfig.extends;

    if (Array.isArray(flatConfig.plugins)) {
      delete flatConfig.plugins;
    } else if (flatConfig.plugins?.["@next/next"]) {
      flatConfig.plugins = {
        ...flatConfig.plugins,
        "@next/next": fixupPluginRules(flatConfig.plugins["@next/next"]),
      };
    }

    return flatConfig;
  }),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
