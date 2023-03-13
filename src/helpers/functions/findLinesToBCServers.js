export const findLinesToBCServers = (servers, devicesOnMap, dataCenters) => {
  const pathLines = [];

  devicesOnMap.forEach(device => {
    let latency = null;
    let result = null;

    dataCenters.forEach(dc => {
      const latencyDc = servers[dc.idServer][device.idRegion][device.idIcon].latency;
      const currentDc = servers[dc.idServer][device.idRegion][device.idIcon];

      if (!result) {
        latency = latencyDc;
        result = currentDc;
      }

      if (latency > latencyDc) {
        latency = latencyDc;
        result = currentDc;
      }
    });

    pathLines.push(result);
  });

  return pathLines;
};
