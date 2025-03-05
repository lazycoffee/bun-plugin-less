import fs from "fs";
import path from "path";
import less from "less";

export function bunPluginLess(config = {}) {
    const BunPluginLess = {
        name: "A Less compiler",
        setup(build) {
            build.onLoad(
                { filter: /\.less$/, namespace: "file" },
                async (args) => {
                    const filePath = args.path;
                    const originCode = fs.readFileSync(filePath, "utf8");
                    config.filename = filePath;
                    const { css } = await less.render(originCode, config);
                    return {
                        contents: css,
                        loader: "css",
                    };
                },
            );
        },
    };
    return BunPluginLess;
}

export function bunPluginHtml(config) {
    if (!config) {
        throw new Error("html plugin config is required");
    }
    const { templatePath, outputs, outdir } = config;
    if (!templatePath) {
        throw new Error("html plugin config.templatePath is required");
    }
    if (!outputs || !outputs.length) {
        throw new Error("html plugin config.outputs is required");
    }
    if (!fs.existsSync(templatePath)) {
        throw new Error("html plugin config.templatePath is not exists");
    }
    if (!outdir) {
        throw new Error("html plugin config.outdir is required");
    }
    const htmlText = fs.readFileSync(templatePath, "utf8");
    const jsEntryList = outputs.filter((each) => each.kind === "entry-point");
    jsEntryList.forEach((buildArtifact) => {
        const jsFilePath = buildArtifact.path;
        const fileDir = path.dirname(jsFilePath);
        const ext = path.extname(jsFilePath);
        if (ext !== ".js") {
            throw new Error("Only js file is supported");
        }
        const fileName = path.basename(jsFilePath, ext);
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
        const jsTag = `\n${intend}${intend}<script src="${jsUrl}"></script>`;
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
