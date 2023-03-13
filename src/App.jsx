import { useEffect, useState } from 'react';

import { DeviceImage } from './components/DeviceImage/DeviceImage';
import { ModalResult } from './components/ModalResult/ModalResult';

import { men } from './constans/manImages';
import { devices } from './constans/deviceImages';
import { servers } from './constans/servers';
import { circles as dataCircles } from './constans/circles';

import { downloadTextPositions } from './constans/downloadTextPositions';
import { findLinesToBCServers } from './helpers/functions/findLinesToBCServers';
import { findLinesToUserServer } from './helpers/functions/findLinesToUserServer';
import { replaceImageOnHoverMan } from './helpers/functions/replaceImageOnHoverMan';
import { replaceImageEmptyMan } from './helpers/functions/replaceImageEmptyMan';
import { findLatencyForImg } from './helpers/functions/findLatencyForImg';
import { showInfoDownloads } from './helpers/functions/showInfoDownloads';
import { TitleMap } from './components/TitleMap/TitleMap';

import styles from './App.module.scss';

const pathImgserverBC = './img/icons/server_ByteCloud.png';
const pathImgserver = './img/icons/server.png';

function App() {
  const [step, setStep] = useState(0);
  const [menImageData, setMenImageData] = useState(men);
  const [devicesOnMap, setDevicesOnMap] = useState([]);
  const [circles, setCircles] = useState(dataCircles);
  const [dataCenters, setDataCenters] = useState([]);
  const [lines, setLines] = useState([]);
  const [infoDownloads, setInfoDownloads] = useState([]);
  const [resultDownloadBC, setResultDownloadBC] = useState([]);
  const [resultDownloadUserDC, setResultDownloadUserDC] = useState([]);

  useEffect(() => {
    if (!menImageData.length) {
      setStep(1);
    }
  }, [menImageData]);

  useEffect(() => {
    if (!circles.length) {
      setStep(3);
    }
  }, [circles]);

  useEffect(() => {
    if (step === 3) {
      setLines(findLinesToBCServers(servers, devicesOnMap, dataCenters));
    }

    if (step === 4) {
      setLines(findLinesToUserServer(servers, devicesOnMap, dataCenters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (resultDownloadBC.length === devicesOnMap.length && resultDownloadBC.length > 0) {
      setStep(4);
    }

    if (resultDownloadUserDC.length === devicesOnMap.length && resultDownloadUserDC.length > 0) {
      setStep(5);
    }

    if (step === 3 && lines.length > 0) {
      setInfoDownloads(showInfoDownloads(resultDownloadBC, lines));
    }

    if (step === 4) {
      setInfoDownloads(showInfoDownloads(resultDownloadUserDC, lines));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDownloadBC, resultDownloadUserDC, step]);

  const handleMouseEnter = (idIcon, idBox) => {
    const result = replaceImageOnHoverMan(menImageData, idIcon, idBox);
    setMenImageData(result);
  };

  const handleMouseLeave = idBox => {
    const result = replaceImageEmptyMan(menImageData, idBox);
    setMenImageData(result);
  };

  const handleClickImage = (idBox, idIcon) => {
    const deviceData = devices.find(el => idBox === el.id && idIcon === el.countDevice);

    if (deviceData) {
      const filterData = menImageData.filter(el => idBox !== el.id);
      setMenImageData(filterData);
      setDevicesOnMap(prev => [...prev, ...deviceData.icons]);
    }
  };

  const handleClickCircle = (className, id) => {
    const updatedCircleOnMap = circles.filter(circle => circle.className !== className);

    if (step === 1) {
      const dataUser = { idServer: id, className, dataUser: true, pathImg: pathImgserver };
      setCircles(updatedCircleOnMap);
      setDataCenters([dataUser]);
      setStep(2);
      return;
    }

    setCircles(updatedCircleOnMap);
    setDataCenters(prev => [...prev, { idServer: id, className, pathImg: pathImgserverBC }]);
  };

  const clearStates = () => {
    setStep(0);
    setMenImageData(men);
    setDevicesOnMap([]);
    setCircles(dataCircles);
    setDataCenters([]);
    setLines([]);
    setInfoDownloads([]);
    setResultDownloadBC([]);
    setResultDownloadUserDC([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <TitleMap
          step={step}
          setStep={setStep}
          setMenImageData={setMenImageData}
          menImageData={menImageData}
          clearStates={clearStates}
          circles={circles}
        />

        <img className={styles.map} src="./img/map/map.png" alt="map" />

        {menImageData.map(({ class: className, id, icons }) => (
          <div key={id} className={`${styles.boxMan}  ${styles[className]}`}>
            {icons.map((icon, i) => (
              <img
                key={i}
                onClick={() => handleClickImage(id, icon.id)}
                onMouseEnter={() => handleMouseEnter(icon.id, icon.idBox)}
                onMouseLeave={() => handleMouseLeave(icon.idBox)}
                src={icon.pathImg}
                alt="man"
                width={icon.size}
              />
            ))}
          </div>
        ))}

        {devicesOnMap.length > 0 &&
          step <= 3 &&
          devicesOnMap.map((device, i) => (
            <DeviceImage
              key={i}
              latency={findLatencyForImg(device.idRegion, lines)}
              device={device}
              onAnimationFinish={setResultDownloadBC}
            />
          ))}

        {devicesOnMap.length > 0 &&
          step >= 4 &&
          devicesOnMap.map((device, i) => (
            <DeviceImage
              key={i}
              latency={findLatencyForImg(device.idRegion, lines)}
              device={device}
              onAnimationFinish={setResultDownloadUserDC}
            />
          ))}

        {(step === 1 || step === 2) &&
          circles.map(circle => (
            <img
              onClick={() => handleClickCircle(circle.className, circle.id)}
              key={circle.className}
              className={`${styles.circle} ${styles[circle.className]}`}
              src={circle.path}
              alt="circle"
            />
          ))}

        {step >= 2 &&
          dataCenters.map(server => (
            <img
              key={server.idServer}
              className={`${styles.server} ${styles[server.className]}`}
              src={server.pathImg}
              alt="server"
            />
          ))}

        {step >= 3 &&
          lines.map(({ path }, i) => <img key={i} className={styles.line} src={path} alt="line" />)}

        {infoDownloads.map((el, i) => (
          <div
            key={i}
            className={`infoDownload ${styles.downloadText} ${
              styles[downloadTextPositions[el.idRegion]]
            }`}
          >
            {el.download ? `time: ${el.download} sec` : `latency: ${el.latency}`}
          </div>
        ))}

        {step === 5 && (
          <ModalResult downloadBC={resultDownloadBC} downloadUserDC={resultDownloadUserDC} />
        )}
      </div>
    </div>
  );
}

export default App;
