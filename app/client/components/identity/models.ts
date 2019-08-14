export enum Theme {
  news = "news",
  features = "features",
  sport = "sport",
  culture = "culture",
  lifestyle = "lifestyle",
  comment = "comment",
  work = "work",
  FromThePapers = "From the papers"
}

export enum ConsentOptionType {
  EMAIL = "EMAIL",
  NEWSLETTER = "NEWSLETTER",
  OPT_OUT = "OPT_OUT"
}

export interface User {
  email: string;
  location: string;
  aboutMe: string;
  interests: string;
  consents: string[];
  username: string;
  validated: boolean;
}

export interface ConsentOption {
  id: string;
  description: string;
  frequency?: string;
  name: string;
  theme?: string;
  type: ConsentOptionType;
  subscribed: boolean;
}

export interface UserCollection {
  getCurrentUser: () => Promise<User>;
  save: (user: User) => Promise<void>;
  saveChanges: (original: User, changed: User) => Promise<void>;
}

export interface ConsentOptionCollection {
  getAll: () => Promise<ConsentOption[]>;
  subscribe: (option: ConsentOption) => Promise<void>;
  unsubscribe: (option: ConsentOption) => Promise<void>;
  newsletters: (options: ConsentOption[]) => ConsentOption[];
  consents: (options: ConsentOption[]) => ConsentOption[];
  unsubscribeAll: () => Promise<void>;
  findById: (
    options: ConsentOption[],
    id: ConsentOption["id"]
  ) => ConsentOption | undefined;
  findByIds: (options: ConsentOption[], ids: string[]) => ConsentOption[];
}
