/**
 * Country data with phone codes, DST rules, and other metadata
 */

export interface CountryInfo {
  name: string;
  phoneCode: string;
  dstObserved: boolean;
  dstStart?: string; // e.g., "second Sunday of March"
  dstEnd?: string;   // e.g., "first Sunday of November"
  holidays?: string[];
}

export const countryData: Record<string, CountryInfo> = {
  // North America
  "United States": {
    name: "United States",
    phoneCode: "+1",
    dstObserved: true,
    dstStart: "Second Sunday of March",
    dstEnd: "First Sunday of November",
  },
  "Canada": {
    name: "Canada",
    phoneCode: "+1",
    dstObserved: true,
    dstStart: "Second Sunday of March",
    dstEnd: "First Sunday of November",
  },
  "Mexico": {
    name: "Mexico",
    phoneCode: "+52",
    dstObserved: true,
    dstStart: "First Sunday of March",
    dstEnd: "Last Sunday of October",
  },

  // Europe
  "United Kingdom": {
    name: "United Kingdom",
    phoneCode: "+44",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "France": {
    name: "France",
    phoneCode: "+33",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Germany": {
    name: "Germany",
    phoneCode: "+49",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Spain": {
    name: "Spain",
    phoneCode: "+34",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Italy": {
    name: "Italy",
    phoneCode: "+39",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Netherlands": {
    name: "Netherlands",
    phoneCode: "+31",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Belgium": {
    name: "Belgium",
    phoneCode: "+32",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Switzerland": {
    name: "Switzerland",
    phoneCode: "+41",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Sweden": {
    name: "Sweden",
    phoneCode: "+46",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Norway": {
    name: "Norway",
    phoneCode: "+47",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Denmark": {
    name: "Denmark",
    phoneCode: "+45",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Poland": {
    name: "Poland",
    phoneCode: "+48",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Russia": {
    name: "Russia",
    phoneCode: "+7",
    dstObserved: false,
  },
  "Turkey": {
    name: "Turkey",
    phoneCode: "+90",
    dstObserved: true,
    dstStart: "Last Sunday of March",
    dstEnd: "Last Sunday of October",
  },

  // Asia
  "China": {
    name: "China",
    phoneCode: "+86",
    dstObserved: false,
  },
  "Japan": {
    name: "Japan",
    phoneCode: "+81",
    dstObserved: false,
  },
  "South Korea": {
    name: "South Korea",
    phoneCode: "+82",
    dstObserved: false,
  },
  "India": {
    name: "India",
    phoneCode: "+91",
    dstObserved: false,
  },
  "Thailand": {
    name: "Thailand",
    phoneCode: "+66",
    dstObserved: false,
  },
  "Vietnam": {
    name: "Vietnam",
    phoneCode: "+84",
    dstObserved: false,
  },
  "Singapore": {
    name: "Singapore",
    phoneCode: "+65",
    dstObserved: false,
  },
  "Malaysia": {
    name: "Malaysia",
    phoneCode: "+60",
    dstObserved: false,
  },
  "Indonesia": {
    name: "Indonesia",
    phoneCode: "+62",
    dstObserved: false,
  },
  "Philippines": {
    name: "Philippines",
    phoneCode: "+63",
    dstObserved: false,
  },
  "Pakistan": {
    name: "Pakistan",
    phoneCode: "+92",
    dstObserved: false,
  },
  "Bangladesh": {
    name: "Bangladesh",
    phoneCode: "+880",
    dstObserved: false,
  },
  "Israel": {
    name: "Israel",
    phoneCode: "+972",
    dstObserved: true,
    dstStart: "Friday before last Sunday of March",
    dstEnd: "Last Sunday of October",
  },
  "Saudi Arabia": {
    name: "Saudi Arabia",
    phoneCode: "+966",
    dstObserved: false,
  },
  "United Arab Emirates": {
    name: "United Arab Emirates",
    phoneCode: "+971",
    dstObserved: false,
  },

  // South America
  "Brazil": {
    name: "Brazil",
    phoneCode: "+55",
    dstObserved: true,
    dstStart: "Third Sunday of October",
    dstEnd: "Third Sunday of February",
  },
  "Argentina": {
    name: "Argentina",
    phoneCode: "+54",
    dstObserved: false,
  },
  "Chile": {
    name: "Chile",
    phoneCode: "+56",
    dstObserved: true,
    dstStart: "Second Sunday of October",
    dstEnd: "Second Sunday of March",
  },
  "Colombia": {
    name: "Colombia",
    phoneCode: "+57",
    dstObserved: false,
  },
  "Peru": {
    name: "Peru",
    phoneCode: "+51",
    dstObserved: false,
  },
  "Venezuela": {
    name: "Venezuela",
    phoneCode: "+58",
    dstObserved: false,
  },

  // Africa
  "South Africa": {
    name: "South Africa",
    phoneCode: "+27",
    dstObserved: false,
  },
  "Egypt": {
    name: "Egypt",
    phoneCode: "+20",
    dstObserved: false,
  },
  "Nigeria": {
    name: "Nigeria",
    phoneCode: "+234",
    dstObserved: false,
  },
  "Kenya": {
    name: "Kenya",
    phoneCode: "+254",
    dstObserved: false,
  },
  "Morocco": {
    name: "Morocco",
    phoneCode: "+212",
    dstObserved: false,
  },

  // Oceania
  "Australia": {
    name: "Australia",
    phoneCode: "+61",
    dstObserved: true,
    dstStart: "First Sunday of October",
    dstEnd: "First Sunday of April",
  },
  "New Zealand": {
    name: "New Zealand",
    phoneCode: "+64",
    dstObserved: true,
    dstStart: "Last Sunday of September",
    dstEnd: "First Sunday of April",
  },
};

/**
 * Get country info by name
 */
export function getCountryInfo(countryName: string): CountryInfo | null {
  return countryData[countryName] || null;
}

/**
 * Get phone code for a country
 */
export function getPhoneCode(countryName: string): string {
  const info = getCountryInfo(countryName);
  return info?.phoneCode || "N/A";
}

/**
 * Check if a country observes DST
 */
export function observesDST(countryName: string): boolean {
  const info = getCountryInfo(countryName);
  return info?.dstObserved || false;
}
