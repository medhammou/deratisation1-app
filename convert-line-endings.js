import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePaths = [
  path.join(__dirname, "backend/src/modules/auth/dto/login.dto.ts"),
  path.join(__dirname, "backend/src/modules/auth/guards/local-auth.guard.ts"),
];

for (const filePath of filePaths) {
  const content = fs.readFileSync(filePath, "utf8");
  const newContent = content.replace(/\r\n/g, "\n");
  fs.writeFileSync(filePath, newContent, "utf8");
}
