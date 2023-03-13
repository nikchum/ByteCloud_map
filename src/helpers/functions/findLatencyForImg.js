export const findLatencyForImg = (idRegion, lines) => {
  if (lines.length > 0) {
    const result = lines.find(line => line.idRegion === idRegion);
    return result.latency;
  }
};
