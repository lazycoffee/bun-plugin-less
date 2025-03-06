import fs from "fs";

export function detectJsModuleType(entrypoints) {
    for (const filePath of entrypoints) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        if (!fileContent) {
            continue;
        }
        // Remove comments to avoid false positives
        const cleanContent = fileContent
            .replace(/\/\/.*$/gm, "") // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments

        // Check for module-specific keywords at meaningful positions
        const hasImport = /^\s*import\s/m.test(cleanContent);
        const hasExport = /^\s*export\s/m.test(cleanContent);

        if (hasImport || hasExport) {
            return "module"; // ES Module
        }
    }
}
