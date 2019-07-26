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

const isNewsletter = (option: ConsentOption): boolean =>
  option.type === ConsentOptionType.NEWSLETTER;

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
      NewslettersAPI.readSubscriptions()
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
  }
};
