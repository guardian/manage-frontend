export const iosAppUrl =
	'https://apps.apple.com/app/the-guardian-live-world-news/id409128287';
export const androidAppUrl =
	'https://play.google.com/store/apps/details?id=com.guardian';
export const iosFeastAppUrl =
	'https://apps.apple.com/us/app/guardian-feast/id6468674686';
export const androidFeastAppUrl =
	'https://play.google.com/store/apps/details?id=uk.co.guardian.feast';
export const iosEditionsAppUrl =
	'https://apps.apple.com/gb/app/the-guardian-editions/id452707806';
export const androidEditionsAppUrl =
	'https://play.google.com/store/apps/details?id=com.guardian.editions';

export enum StoreLinksMapKey {
	Ios = 'ios',
	Android = 'android',
	IosFeast = 'iosFeast',
	AndroidFeast = 'androidFeast',
	IosEditions = 'iosEditions',
	AndroidEditions = 'androidEditions',
}

export const STORES_LINKS_MAP: Record<StoreLinksMapKey, string> = {
	[StoreLinksMapKey.Ios]: iosAppUrl,
	[StoreLinksMapKey.Android]: androidAppUrl,
	[StoreLinksMapKey.IosFeast]: iosFeastAppUrl,
	[StoreLinksMapKey.AndroidFeast]: androidFeastAppUrl,
	[StoreLinksMapKey.IosEditions]: iosEditionsAppUrl,
	[StoreLinksMapKey.AndroidEditions]: androidEditionsAppUrl,
};
