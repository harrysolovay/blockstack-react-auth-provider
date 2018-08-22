const rewireBabel = require('./rewires/babel')
const rewireWhitelist = require('./rewires/whitelist')

module.exports = {

  webpack: (config, env) => {

    config = rewireBabel(config)

    if(env === 'production') {

      config = rewireWhitelist(config, [
        'bitcoinjs-lib',
        'tiny-secp256k1/ecurve',
        'base64url/dist/base64url',
        'base64url/dist/pad-string',
        'bip32',
      ].map(module => `node_modules/${module}`))

    }

    return config

  },

  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      
      const config = configFunction(proxy, allowedHost)
      
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
      }

      return config

    }
  },

}