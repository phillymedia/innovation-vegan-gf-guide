export function pushAnalytics(misc) {
  if (typeof PMNdataLayer !== 'undefined') {
  PMNdataLayer.push({
    'event': 'misc_event', // not customizable
    'eventAction': 'click', // all lowercase, underscore_separated string
    'eventLabel': 'vegan_gf_guide' + misc
  });
}
}
