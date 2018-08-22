const { getBabelLoader } = require('react-app-rewired')

module.exports = (config) => {
  const babelLoader = getBabelLoader(config.module.rules)
  babelLoader.options.babelrc = true
  return config  
}
