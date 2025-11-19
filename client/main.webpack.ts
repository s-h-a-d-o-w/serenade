import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { type Configuration } from "webpack";

import nodeExternals from "webpack-node-externals";
import WebpackShellPlugin from "webpack-shell-plugin-next";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: path.join(__dirname, "src/main/index.ts"),
  target: "electron-main",

  node: {
    __dirname: "node-module",
    __filename: "node-module",
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          path.join(__dirname, "src/gen"),
          path.join(__dirname, "src/main"),
          path.join(__dirname, "src/shared"),
        ],
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpg)$/i,
        type: "asset/resource",
      },
    ],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    module: true,
    path: path.join(__dirname, "out"),
    filename: "[name].js",
    library: {
      type: "module",
    },
  },
  externalsType: "module",
  externalsPresets: { node: true },
  externals: [nodeExternals({
    importType: "module",
  })],
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: [
          async () => {
            const { default: fs } = await import("fs-extra");
            fs.mkdirpSync("out/static");
            fs.copySync(
              "static/custom-commands-server/node_modules",
              "out/static/custom-commands-server-modules"
            );
          },
        ],
      },
    }),
  ],
};

export default config;
