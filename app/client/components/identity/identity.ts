import * as ConsentsAPI from "./idapi/consents";
import * as NewslettersAPI from "./idapi/newsletters";
import * as NewslettersSubscriptionsAPI from "./idapi/newsletterSubscriptions";
import * as RemoveSubscriptionsAPI from "./idapi/removeSubscriptions";
import * as UserAPI from "./idapi/user";

import {
  ConsentOption,
  ConsentOptionCollection,
  ConsentOptionType
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
