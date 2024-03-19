const cwd = require('cwd');

module.exports = {
  seedPath: `${cwd()}/tests/schema.sql`,
  version: 14,
  port: 5555,
	includeInstallation: true,
  debugMode: true
};
