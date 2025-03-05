import path from "path";
import LessBunPlugin from "../index.mjs";
import fs from "fs";

const ROOT_DIR = process.cwd();

async function main() {
    const indexPath = path.join(ROOT_DIR, "playground/source/index.html");
    const outDir = path.join(ROOT_DIR, "playground/dist");
    fs.existsSync(outDir) && fs.rmdirSync(outDir, { recursive: true });
    await Bun.build({
        entrypoints: [indexPath],
        outdir: outDir,
        plugins: [LessBunPlugin],
    });
}
main();
