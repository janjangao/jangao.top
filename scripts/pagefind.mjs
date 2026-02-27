import { execSync } from "child_process";

const serverEnv = process.env.SERVER_ENV;

const outputPath =
  serverEnv === "static"
    ? "out/_pagefind"
    : "public/_pagefind";

console.log("SERVER_ENV:", serverEnv);
console.log("Pagefind output:", outputPath);

execSync(
  `pagefind --site .next/server/app --output-path ${outputPath}`,
  { stdio: "inherit" }
);