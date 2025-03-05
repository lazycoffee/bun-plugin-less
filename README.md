# bun-plugin-less

A bun bundler plugin for compiling Less file. It is just a wrapper of less compiler(https://lesscss.org/).

## Usage

Just use it like any other bun plugin.

```js
import BunPluginLess from "bun-plugin-less";

Bun.build({
    entrypoints: ["./index.html"],
    outdir: "./dist",
    plugins: [BunPluginLess],
});
```

Or you can find a example in 'playground/build.mjs';
