import React from 'react';
import style from './DownloadsByRegion.module.css';


const DownloadsByRegion = ({ data }) => {
  const total = data ? data.reduce((acc, item) => acc + item.count, 0) : 0;
  return (
    <div className={style.container}>
      {total > 0 ? (
        <>
            <h2 className={style.header2}>Téléchargement par Région</h2>
            {data.map((item, index) => {
              const percentage = ((item.count / total) * 100).toFixed(2);
              return (
                <div key={index} className={style.regionBar}>
                  <p className={style.label}>
                    Région {item.nom_region} - {item.count} téléchargement
                  </p>
                  <div className={style.progressBarContainer}>
                    <div
                      className={style.progressBar}
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <div className={style.percentageLabel}>{percentage}%</div>
                  </div>
                </div>
              );
            })}
        </>
      ) : (<h2 className={style.header2}>0 téléchargement</h2>)
      }
    </div>
  );
};

export default DownloadsByRegion;
