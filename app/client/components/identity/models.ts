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

export enum ErrorTypes {
  GENERAL = "GENERAL",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION = "VALIDATION"
}

export enum ConsentOptionType {
  EMAIL = "EMAIL",
  NEWSLETTER = "NEWSLETTER",
  OPT_OUT = "OPT_OUT"
}

export interface User {
  id: string;
  email: string;
  location: string;
  aboutMe: string;
  interests: string;
  consents: string[];
  username: string;
  validated: boolean;
  title: string;
  firstName: string;
  secondName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  postcode: string;
  country: string;
  phoneCountryCode: string;
  phoneLocalNumber: string;
}

export interface UserError {
  type: ErrorTypes.VALIDATION;
  error: {
    aboutMe: string;
    location: string;
    interests: string;
    username: string;
  };
}

export interface UserCollection {
  getCurrentUser: () => Promise<User>;
  save: (user: User) => Promise<void>;
  saveChanges: (original: User, changed: User) => Promise<void>;
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

/*
 * The following models are being used to aid in migration of functionality off of a legacy system. There is
 * currently no standard library or API for these values at the Guardian, but when this becomes available these models should be
 * replaced with them. The models in question are Titles, InternationalPhoneCodes and Countries. Please note that these lists are
 * not considered standardised as they comply with the Guardian's stance on various issues.
 */

export enum Titles {
  MR = "Mr",
  MRS = "Mrs",
  MS = "Ms",
  MX = "Mx",
  MISS = "Miss",
  DR = "Dr",
  PROF = "Prof",
  REV = "Rev"
}

// Stolen from: https://github.com/guardian/support-frontend/blob/master/support-frontend/assets/helpers/internationalisation/country.js
export const COUNTRIES: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Saint Eustatius and Saba",
  "Bosnia-Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "British Virgin Islands",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde Islands",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Korea",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territories",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Islands",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Christopher & Nevis",
  "Saint Helena",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre & Miquelon",
  "Saint Vincent & The Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia & The South Sandwich Islands",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "United States Virgin Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Wallis & Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands"
];
