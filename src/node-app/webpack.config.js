const path = require('path');
const jsLoaders = require('./loaders/js-loaders');

module.exports = function (env, argv) {

    // default to the server configuration
    const base = {
        entry: './src/server/index.ts',
        output: {
            filename: 'js/server.js',
            // path needs to be an ABSOLUTE file path
            path: path.resolve(process.cwd(), 'dist'),
            publicPath: '/',
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: 'cheap-module-eval-source-map',
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                '/src': path.join(__dirname, '../src'),
                src2: path.resolve(__dirname, '../src/api/'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)?$/,
                    enforce: 'pre',
                    use: jsLoaders,
                    exclude: [/(node_modules)/]
                }
            ]
        },
    }

    // server-specific configuration
    base.target = 'node';

    // client-specific configurations
    // if (env.platform === 'web') {
    //     base.entry = './src/clientEntry.tsx';
    //     base.output.filename = 'js/client.js';
    // }

    return base;
}
