const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    outdir: "dist",
    alias: {
      "@": "." 
    },
    sourcemap: true, // Optional: for debugging
    minify: false, // Set to true for production builds
  })
  .catch(() => process.exit(1));
