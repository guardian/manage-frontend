import * as ConsentsAPI from "./idapi/consents";
import * as NewslettersAPI from "./idapi/newsletters";
import * as UserAPI from "./idapi/user";
import {
  ConsentOption,
  ConsentOptionCollection,
  ConsentOptionType
} from "./models";

export const filterNewsletters = (options: ConsentOption[]): ConsentOption[] =>
  options.filter(option => option.type === ConsentOptionType.NEWSLETTER);

const filterEmailConsents = (options: ConsentOption[]): ConsentOption[] =>
  options.filter(option => option.type === ConsentOptionType.EMAIL);

const filterOptOuts = (options: ConsentOption[]): ConsentOption[] =>
  options.filter(option => option.type === ConsentOptionType.OPT_OUT);

export const filterConsents = (options: ConsentOption[]): ConsentOption[] => [
  ...filterEmailConsents(options),
  ...filterOptOuts(options)
];

const mapSubscriptions = (
  subscriptions: string[],
  options: ConsentOption[]
): ConsentOption[] =>
  options.map(option => ({
    ...option,
    subscribed: option.subscribed ? true : subscriptions.includes(option.id)
  }));

export const Newsletters: ConsentOptionCollection = {
  async getAll(): Promise<ConsentOption[]> {
    const [newsletters, subscriptions] = await Promise.all([
      NewslettersAPI.read(),
      NewslettersAPI.readSubscriptions()
    ]);
    return mapSubscriptions(subscriptions, newsletters);
  },
  async subscribe(id: string): Promise<void> {
    return NewslettersAPI.update(id, true);
  },
  async unsubscribe(id: string): Promise<void> {
    return NewslettersAPI.update(id, false);
  }
};

export const Consents: ConsentOptionCollection = {
  async getAll(): Promise<ConsentOption[]> {
    const [consents, user] = await Promise.all([
      ConsentsAPI.read(),
      UserAPI.memoRead()
    ]);
    return mapSubscriptions(user.consents, consents);
  },
  async subscribe(id: string): Promise<void> {
    return ConsentsAPI.update(id, true);
  },
  async unsubscribe(id: string): Promise<void> {
    return ConsentsAPI.update(id, false);
  }
};
