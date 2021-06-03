const path = require('path');
const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
        entry: 'src/silent_renew/index.js',
        template: 'public/silent_renew.html',
        outPath: 'silent_renew.html'
      }
  ]);
   
  module.exports = {
    webpack: function(config, env) {
      multipleEntry.addMultiEntry(config);

      config.module.rules.push({
        test: /\.ttf$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, './static/media/[name].[ext]'),
      });
      
      return config;
    }
  };