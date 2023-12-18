import { defineConfig } from 'cypress';

export default defineConfig({
	viewportWidth: 1500,
	viewportHeight: 860,
	video: false,
	chromeWebSecurity: false,
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
		specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.ts')(on, config);
		},
		baseUrl: 'https://manage.thegulocal.com',
	},
});
