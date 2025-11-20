const path = require('path');
const pkg = require('../package.json');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  dependencies: {
    [pkg.name]: {
      root: path.join(__dirname, '..'),
      platforms: {
        ios: {},
        android: {
          sourceDir: path.join(__dirname, '..', 'android'),
          packageImportPath:
            'import com.twilio.verify.reactnative.RNTwilioVerifyPackage;',
          packageInstance: 'new RNTwilioVerifyPackage()',
        },
      },
    },
  },
};
