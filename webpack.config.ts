import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
  DefinePlugin,
} from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DotEnv from 'dotenv-webpack';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  entry: './src/main.tsx',
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|ico|ttf|woff2?|eot|otf|gif|jpg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: 'src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'KLAYsea',
    }),
    isDevelopment && new HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new DotEnv(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    client: {
      overlay: true,
    },
    historyApiFallback: true,
  },
  devtool: isDevelopment ? 'inline-source-map' : undefined,
};

export default config;
