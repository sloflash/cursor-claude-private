const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    target: 'node',
    mode: 'production',
    entry: './out/extension.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.js']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_fnames: false,
                    mangle: true,
                    compress: {
                        drop_console: false, // Keep console logs for debugging
                        drop_debugger: true,
                        pure_funcs: ['console.debug']
                    }
                }
            })
        ]
    },
    plugins: [
        new JavaScriptObfuscator({
            rotateStringArray: true,
            shuffleStringArray: true,
            stringArray: true,
            stringArrayThreshold: 0.8,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }, [])
    ]
};