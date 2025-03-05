import fs from "fs";
import less from "less";

const BunPlugin = {
    name: "Bun Less compiler plugin",
    setup(build) {
        build.onLoad({ filter: /\.less$/ }, async (args) => {
            const filePath = args.path;
            const originCode = fs.readFileSync(filePath, "utf8");
            const { css } = await less.render(originCode, {
                filename: filePath,
            });
            return {
                contents: css,
                loader: "css",
            };
        });
    },
};
export default BunPlugin;
