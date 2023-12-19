const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = async function (env, argv) {
  const isEnvProduction = env.mode === "production";
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.module.rules.push(
    {
      test: /\.html$/i,
      loader: "html-loader",
      options: {
        sources: false,
      }
    }
  );

  if (isEnvProduction) {
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, "src/service-worker.js"),
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [
          /\.map$/,
          /asset-manifest\.json$/,
          /LICENSE/,
          /\.js\.gz$/,
          /(apple-touch-startup-image|chrome-icon|apple-touch-icon).*\.png$/,
        ],
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024
      })
    );
  }
  return config;
};
