import fs from "fs";

export function bunPluginSvg() {
    const BunPluginSvg = {
        name: "import svg as raw string",
        setup(build) {
            build.onLoad(
                { filter: /\.svg$/, namespace: "file" },
                async (args) => {
                    const filePath = args.path;
                    const svgCode = fs.readFileSync(filePath, "utf8");
                    return {
                        contents: svgCode,
                        loader: "text",
                    };
                },
            );
        },
    };
    return BunPluginSvg;
}
