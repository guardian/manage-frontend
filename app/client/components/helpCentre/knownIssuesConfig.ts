type Category = 1 | 2;

interface Issue {
  date: string;
  message: string;
  category: Category;
  affectedProducts?: string[];
}

export const knownIssuesConfig: Issue[] = [
  /*
  {
    date: "10 Dec 1999 14:30",
    message: "product issue - 1999",
    category: 2,
    affectedProducts: ["Newspaper Delivery"],
  },
  {
    date: "04 Dec 1995 00:12",
    message: "product issue - 1995",
    category: 2,
    affectedProducts: ["Contribution", "Newspaper Delivery"],
  },
  {
    date: "15 Dec 2020 15:14",
    message: "global issue - 2020",
    category: 1,
  },
  {
    date: "25 Dec 2005 13:20",
    message: "global issue - 2005",
    category: 1,
  },
  */
];
