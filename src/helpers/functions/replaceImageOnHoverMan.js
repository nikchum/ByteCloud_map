const pathManFilledImg = './img/icons/man_filled.png';

export const replaceImageOnHoverMan = (menImageData, idIcon, idBox) => {
  const result = menImageData.map(man => {
    const newMan = JSON.parse(JSON.stringify(man));
    if (man.id === idBox) {
      switch (idIcon) {
        case 1:
          newMan.icons[0].pathImg = pathManFilledImg;
          return newMan;

        case 2:
          newMan.icons[1].pathImg = pathManFilledImg;
          newMan.icons[0].pathImg = pathManFilledImg;
          return newMan;

        default:
          newMan.icons[0].pathImg = pathManFilledImg;
          newMan.icons[1].pathImg = pathManFilledImg;
          newMan.icons[2].pathImg = pathManFilledImg;
          return newMan;
      }
    }
    return newMan;
  });

  return result;
};
