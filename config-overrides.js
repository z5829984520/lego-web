const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');
const { getThemeVariables } = require('antd/dist/theme');

//生产环境去除console.* functions
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
};

module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: '[local]__[hash:base64:5]',
    // modifyVars: {
    //   '@primary-color': 'rgb(105, 73, 186)',
    //   // dark: true, // 开启暗黑模式
    //   // compact: true, // 开启紧凑模式
    // }
    modifyVars: {
      // ...getThemeVariables({
      //   dark: true
      // }),
      // '@primary-color': 'rgb(105, 73, 186)',
    },
  }),
  dropConsole(),
);
