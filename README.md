# less-bun-plugin

A bun bundler plugin for compiling Less file. It is just a wrapper of less compiler(https://lesscss.org/).

## Usage

Just use it like any other bun plugin.

```js
import LessBunPlugin from "less-bun-plugin";

Bun.build({
    entrypoints: ["./index.html"],
    outdir: "./dist",
    plugins: [LessBunPlugin],
});
```

Or you can find a example in 'playground/build.mjs';
