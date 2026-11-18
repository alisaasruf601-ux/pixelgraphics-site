/** GraphQL queries the visual editor uses to send live changes. Field lists mirror tina/config.ts. */
export const HOME_QUERY = `query home($relativePath: String!) { home(relativePath: $relativePath) {
  hero { kicker headline { text accent } intro primaryButton { label link } secondaryButton { label link } markets }
  services { kicker title accent intro cardButton }
  calculator { title accent text points button }
  process { kicker title accent intro button steps { title text icon } }
  pricing { kicker title accent intro note }
  finalCta { title accent text primaryButton secondaryButton }
} }`;
export const SERVICES_QUERY = `query services($relativePath: String!) { services(relativePath: $relativePath) {
  showcase { title image slug }
  departments { title shortTitle number icon summary intro services deliverables slug }
} }`;
export const PRICING_QUERY = `query pricing($relativePath: String!) { pricing(relativePath: $relativePath) {
  hourly { service rate minHours maxHours rushSurcharge quickPicks examples department }
  packages { name priceFrom recommended bestFor included deliverables revisions duration extras limitations id period }
  packageTerms
} }`;
export const THEME_QUERY = `query theme($relativePath: String!) { theme(relativePath: $relativePath) {
  headingFont bodyFont accentColor headingSize textSize
} }`;
