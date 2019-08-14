import * as ConsentsAPI from "./idapi/consents";
import * as NewslettersAPI from "./idapi/newsletters";
import * as NewslettersSubscriptionsAPI from "./idapi/newsletterSubscriptions";
import * as RemoveSubscriptionsAPI from "./idapi/removeSubscriptions";
import * as UserAPI from "./idapi/user";

import {
  ConsentOption,
  ConsentOptionCollection,
  ConsentOptionType,
  User,
  UserCollection
} from "./models";

const isNewsletter = (option: ConsentOption): boolean =>
  option.type === ConsentOptionType.NEWSLETTER;
const isConsent = (option: ConsentOption): boolean =>
  option.type !== ConsentOptionType.NEWSLETTER;

const mapSubscriptions = (
  subscriptions: string[],
  options: ConsentOption[]
): ConsentOption[] =>
  options.map(option => ({
    ...option,
    subscribed: option.subscribed ? true : subscriptions.includes(option.id)
  }));

export const Users: UserCollection = {
  async getCurrentUser(): Promise<User> {
    return await UserAPI.memoRead();
  },
  async save(user: User): Promise<void> {
    return await UserAPI.write(user);
  },
  async saveChanges(original: User, changed: User): Promise<void> {
    type UserKey = keyof User;
    let fields: Partial<User> = {};
    for (const key in changed) {
      if (original[key as UserKey] !== changed[key as UserKey]) {
        fields = { ...fields, [key as UserKey]: changed[key as UserKey] };
      }
    }
    return await UserAPI.write(fields);
  }
};

export const ConsentOptions: ConsentOptionCollection = {
  async getAll(): Promise<ConsentOption[]> {
    const [newsletters, subscriptions] = await Promise.all([
      NewslettersAPI.read(),
      NewslettersSubscriptionsAPI.read()
    ]);
    const [consents, user] = await Promise.all([
      ConsentsAPI.read(),
      UserAPI.memoRead()
    ]);
    return mapSubscriptions(
      [...subscriptions, ...user.consents],
      [...newsletters, ...consents]
    );
  },
  async subscribe(option: ConsentOption): Promise<void> {
    if (isNewsletter(option)) {
      return NewslettersAPI.update(option.id, true);
    } else {
      return ConsentsAPI.update(option.id, true);
    }
  },
  async unsubscribe(option: ConsentOption): Promise<void> {
    if (isNewsletter(option)) {
      return NewslettersAPI.update(option.id, false);
    } else {
      return ConsentsAPI.update(option.id, false);
    }
  },
  async unsubscribeAll(): Promise<void> {
    return await RemoveSubscriptionsAPI.execute();
  },
  newsletters(options: ConsentOption[]): ConsentOption[] {
    return options.filter(isNewsletter);
  },
  consents(options: ConsentOption[]): ConsentOption[] {
    return options.filter(isConsent);
  },
  findById(options, id): ConsentOption | undefined {
    return options.find(o => id === o.id);
  },
  findByIds(options, ids): ConsentOption[] {
    return ids
      .map(id => options.find(c => c.id === id))
      .filter((x): x is ConsentOption => x !== undefined);
  }
};
