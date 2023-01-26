export const mediaSize = {
  mobile: '475px',
  tablet: '767px',
  laptop: '1024px',
}

export const device = {
  mobile: `(min-width: ${mediaSize.mobile})`,
  tablet: `(min-width: ${mediaSize.tablet})`,
  laptop: `(min-width: ${mediaSize.laptop})`,
  mobileMax: `(max-width: ${mediaSize.mobile})`,
  tabletMax: `(max-width: ${mediaSize.tablet})`,
  laptopMax: `(max-width: ${mediaSize.laptop})`,
}
