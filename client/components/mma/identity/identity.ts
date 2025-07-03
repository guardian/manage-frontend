import * as ConsentsAPI from './idapi/consents';
import * as NewslettersAPI from './idapi/newsletters';
import * as NewslettersSubscriptionsAPI from './idapi/newsletterSubscriptions';
import * as RemoveSubscriptionsAPI from './idapi/removeSubscriptions';
import * as SupportRemindersApi from './idapi/supportReminders';
import * as UserAPI from './idapi/user';
import type {
	ConsentOption,
	ConsentOptionCollection,
	User,
	UserCollection,
} from './models';
import { ConsentOptionType } from './models';

const isNewsletter = (option: ConsentOption): boolean =>
	option.type === ConsentOptionType.NEWSLETTER;
const isConsent = (option: ConsentOption): boolean =>
	option.type !== ConsentOptionType.NEWSLETTER;
const isSupportReminderConsent = (option: ConsentOption): boolean =>
	option.type === ConsentOptionType.SUPPORT_REMINDER;
const isDeprecated = (option: ConsentOption): boolean =>
	['supporter'].includes(option.id);

export const mapSubscriptions = (
	subscriptions: string[],
	options: ConsentOption[],
): ConsentOption[] =>
	options.map((option) => ({
		...option,
		subscribed: option.subscribed
			? true
			: subscriptions.includes(option.id),
		isDeprecated: isDeprecated(option),
	}));

const diff = (a: User, b: User): Partial<User> => {
	type UserKey = keyof User;
	let fields: Partial<User> = {};
	Object.keys(b).forEach((key) => {
		const k: UserKey = key as UserKey;
		if (a[k] !== b[k]) {
			fields = { ...fields, [k]: b[k] };
		}
	});
	return fields;
};

const diffWithCompositeFields = (a: User, b: User): Partial<User> => {
	const fields = diff(a, b);
	if (fields.localNumber || fields.countryCode) {
		return {
			...fields,
			localNumber: b.localNumber,
			countryCode: b.countryCode,
		};
	} else {
		return fields;
	}
};

export const Users: UserCollection = {
	async getCurrentUser(): Promise<User> {
		return await UserAPI.read();
	},
	async save(user: User): Promise<User> {
		return await UserAPI.write(user);
	},
	async saveChanges(original: User, changed: User): Promise<User> {
		const fields: Partial<User> = diffWithCompositeFields(
			original,
			changed,
		);
		return await UserAPI.write(fields);
	},
	getChangedFields(original: User, changed: User): Partial<User> {
		return diffWithCompositeFields(original, changed);
	},
	async setUsername(user: User): Promise<User> {
		return await UserAPI.setUsername(user);
	},
};

export const ConsentOptions: ConsentOptionCollection = {
	async getAll(): Promise<ConsentOption[]> {
		const [newsletters, subscriptions] = await Promise.all([
			NewslettersAPI.read(),
			NewslettersSubscriptionsAPI.read(),
		]);
		const [consents, user] = await Promise.all([
			ConsentsAPI.read(),
			UserAPI.read(),
		]);
		const supportReminders = await SupportRemindersApi.read();

		return mapSubscriptions(
			[...subscriptions, ...user.consents],
			[...newsletters, ...consents, ...supportReminders],
		);
	},
	async subscribe(option: ConsentOption): Promise<void> {
		if (isNewsletter(option)) {
			return NewslettersAPI.update(option.id, true);
		} else if (isSupportReminderConsent(option)) {
			return SupportRemindersApi.update(option.id, true);
		} else {
			return ConsentsAPI.update(option.id, true);
		}
	},
	async unsubscribe(option: ConsentOption): Promise<void> {
		if (isNewsletter(option)) {
			return NewslettersAPI.update(option.id, false);
		} else if (isSupportReminderConsent(option)) {
			return SupportRemindersApi.update(option.id, false);
		} else {
			return ConsentsAPI.update(option.id, false);
		}
	},
	async unsubscribeAll(): Promise<void> {
		return await RemoveSubscriptionsAPI.execute();
	},
	newsletters(options: ConsentOption[]): ConsentOption[] {
		return (
			options
				.filter(isNewsletter)
				// @AB_TEST: Default Onboarding Newsletter Test: START
				// Prevent trial newsletter from displaying.
				.filter((newsletter: ConsentOption) => newsletter.id !== '6028') // identityId: 'saturday-roundup-trial'
			// @AB_TEST: Default Onboarding Newsletter Test: END
		);
	},
	consents(options: ConsentOption[]): ConsentOption[] {
		return options.filter(isConsent);
	},
	findById(options, id): ConsentOption | undefined {
		return options.find((o) => id === o.id);
	},
	findByIds(options, ids): ConsentOption[] {
		return ids
			.map((id) => options.find((c) => c.id === id))
			.filter((x): x is ConsentOption => x !== undefined);
	},
};
