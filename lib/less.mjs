import fs from "fs";
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
