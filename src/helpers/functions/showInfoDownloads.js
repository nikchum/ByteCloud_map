export const showInfoDownloads = (downloadResult, lines) => {
  const linesWithIdRegion = lines.filter(el => el.idRegion);

  const updateData = linesWithIdRegion.map(el => {
    const newEl = { ...el };
    const elementDownload = downloadResult.find(({ idRegion }) => idRegion === el.idRegion);

    if (elementDownload) {
      newEl.download = (elementDownload.downloadTime / 1000).toFixed(1);
    }
    return newEl;
  });

  return updateData;
};
