import fs from "fs";
import path from "path";
import { detectJsModuleType } from "./util.mjs";
export function bunPluginHtml(config) {
    if (!config) {
        throw new Error("html plugin config is required");
    }
    const { templatePath, outputs, buildConfig } = config;
    if (!templatePath) {
        throw new Error("html plugin config.templatePath is required");
    }
    if (!outputs || !outputs.length) {
        throw new Error("html plugin config.outputs is required");
    }
    if (!fs.existsSync(templatePath)) {
        throw new Error("html plugin config.templatePath is not exists");
    }
    const { outdir, entrypoints } = buildConfig;
    if (!outdir) {
        throw new Error("html plugin config.buildConfig.outdir is required");
    }
    const htmlText = fs.readFileSync(templatePath, "utf8");
    const jsEntryList = outputs.filter((each) => each.kind === "entry-point");
    const scriptType = detectJsModuleType(entrypoints) || "text/javascript";
    jsEntryList.forEach((buildArtifact) => {
        const jsFilePath = buildArtifact.path;
        const fileDir = path.dirname(jsFilePath);
        const ext = path.extname(jsFilePath);
        const fileName = path.basename(jsFilePath, ext);
        if (ext !== ".js") {
            throw new Error("Only js file is supported");
        }
        const cssFilePath = path.join(fileDir, `${fileName}.css`);
        const reg = /(\s*)\<\s*\/\s*head>\s*/;
        const match = htmlText.match(reg);
        if (!match) {
            throw new Error("No <head> block in your html template file");
        }
        const headTag = match[0];
        const intend = match[1].replace(/[\r\n]+/, "");
        // inject js file
        const jsUrl = jsFilePath.replace(outdir, "").replace(/\\/g, "/");
        const jsTag = `\n${intend}${intend}<script src="${jsUrl}" type="${scriptType}"></script>`;
        let injectHtml = htmlText.replace(reg, jsTag + headTag);
        // inject css file
        if (fs.existsSync(cssFilePath)) {
            const cssUrl = cssFilePath.replace(outdir, "").replace(/\\/g, "/");
            const cssTag = `\n${intend}${intend}<link rel="stylesheet" href="${cssUrl}">`;
            injectHtml = injectHtml.replace(reg, cssTag + headTag);
        }
        const htmlFilePath = path.join(fileDir, `${fileName}.html`);
        fs.writeFileSync(htmlFilePath, injectHtml);
    });
}
