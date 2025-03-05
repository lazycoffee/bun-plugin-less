# lc-bun-plugin

Some useful plugins for bun bundler.

-   bunPluginLess - A less compiler plugin
-   bunPluginHtml - Use one html template for multi entry points

## Usage

Just use it like any other bun plugin.

```js
import { bunPluginLess, bunPluginHtml } from "lc-bun-plugin";
import path from "path";

async function main() {
    const BunPluginLess = bunPluginLess({
        sourceMap: { sourceMapFileInline: true },
        // extra config: https://lesscss.org/usage/#programmatic-usage
    });

    const { outputs } = await Bun.build({
        entrypoints: ["./index.html"],
        outdir: "./dist",
        plugins: [BunPluginLess],
    });
    // has to be called after bun.build()
    bunPluginHtml({
        templatePath: path.join(process.cwd(), "front/template.html"),
        // I need to known the output path to inject the bundle path
        outputs,
        // I also need to known the output dir to inject the assets path
        outdir: "./dist",
    });
}
main();
```

Or you can find an example in 'playground/build.mjs';
