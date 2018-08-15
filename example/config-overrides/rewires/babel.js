const { getBabelLoader } = require('react-app-rewired')

module.exports = (config) => {

  const babelLoader = getBabelLoader(config.module.rules)
  delete babelLoader.options.presets
  babelLoader.options.babelrc = true

  return config  
}
