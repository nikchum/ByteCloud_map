export const findLinesToUserServer = (servers, devicesOnMap, dataCenters) => {
  const mainDCId = dataCenters.find(dc => dc.dataUser);

  const lines = devicesOnMap.map(el => {
    return servers[mainDCId.idServer][el.idRegion][el.idIcon];
  });

  return lines;
};
