const regions = {
  1: 'North America',
  2: 'South America',
  3: 'Europe',
  4: 'Oceania',
  5: 'Asia',
};

export const uniqueAndNormalizeData = data => {
  const uniqueData = data.filter(
    (obj, idx, arr) => idx === arr.findIndex(t => t.idRegion === obj.idRegion)
  );

  const normalizeData = uniqueData.map(el => {
    const copyEl = { ...el };
    copyEl.idRegion = regions[copyEl.idRegion];
    copyEl.downloadTime = (copyEl.downloadTime / 1000).toFixed(1);
    copyEl.rating = calculatesRating(copyEl.latency);
    copyEl.video = getVideoQuality(copyEl.rating);
    return copyEl;
  });

  return normalizeData;
};

const getVideoQuality = rating => {
  switch (rating) {
    case 5:
    case 4:
      return '4K/2160p Ultra HD';

    case 3:
      return '1080p Full HD';

    case 2:
      return '720p';

    default:
      return '480p';
  }
};

const calculatesRating = value => {
  switch (true) {
    case value >= 300:
      return 1;

    case value < 300 && value >= 220:
      return 2;

    case value < 220 && value >= 150:
      return 3;

    case value < 150 && value >= 80:
      return 4;

    default:
      return 5;
  }
};
