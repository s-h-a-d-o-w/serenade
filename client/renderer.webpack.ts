import HtmlWebpackPlugin from "html-webpack-plugin";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: WebpackDevServerConfiguration & Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  watchOptions: {
    ignored: ["**/out/**", "**/node_modules/**"],
    aggregateTimeout: 300,
  },
  entry: path.join(__dirname, "src/renderer/index.tsx"),
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          path.join(__dirname, "src/gen"),
          path.join(__dirname, "src/renderer"),
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
      {
        test: /\.css$/,
        include: [path.join(__dirname, "src/renderer/css")],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: false,
    // static: {
    //   directory: path.join(__dirname, "out/renderer"),
    //   publicPath: "/",
    // },
    port: 4000,
    historyApiFallback: true,
    compress: true,
    watchFiles: {
      paths: ["src/**/*"],
      options: {
        ignored: ["**/out/**"],
        usePolling: false,
      },
    },
  },
  output: {
    path: path.join(__dirname, "out/renderer"),
    filename: "js/[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, "src/renderer/index.html") }),
  ],
};

export default config;
