import { defineConfig } from 'cypress';

export default defineConfig({
	viewportWidth: 1500,
	viewportHeight: 860,
	video: false,
	failOnStatusCode: false,
	chromeWebSecurity: false,
	experimentalSessionSupport: true,
	blockHosts: [
		'*ophan.theguardian.com',
		'pixel.adsafeprotected.com',
		'*permutive.com',
		'*adnxs.com',
		'*adsystem.com',
		'*casalemedia.com',
		'*pubmatic.com',
		'*360yield.com',
		'*omnitagjs.com',
		'*the-ozone-project.com',
		'*openx.net',
	],
	fixturesFolder: false,
	retries: {
		runMode: 2,
		openMode: 0,
	},
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.ts')(on, config);
		},
		baseUrl: 'http://localhost:9234/',
	},
});
