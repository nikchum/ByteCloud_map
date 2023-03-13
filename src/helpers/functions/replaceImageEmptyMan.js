const pathManEmptyImg = './img/icons/man_empty.png';

export const replaceImageEmptyMan = (menImageData, idBox) => {
  const result = menImageData.map(el => {
    if (el.id === idBox) {
      el.icons = el.icons.map(icon => {
        icon.pathImg = pathManEmptyImg;
        return icon;
      });
      return el;
    }
    return el;
  });

  return result;
};
