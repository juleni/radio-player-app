// import { RadioBrowserApi } from "radio-browser-api";
import { RadioPlayer, StationSearchType } from "iradio.player.js";
import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./default-radio-station.jpg";

export default function Radio() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("pop");
  const [stationLanguage, setStationLanguage] = useState("slovak");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    setShowMessage(true);
    setupApi(stationFilter).then((data) => {
      setStations(data);
      setShowMessage(false);
    });
  }, [stationFilter, stationLanguage]);

  const setupApi = async (stationFilter) => {
    const api = new RadioPlayer();
    await api.getStationsBy(StationSearchType.byTag, stationFilter);
    const stations = await api.searchStations({
      countryCode: "US",
      limit: 5,
      offset: 0, // this is the default - can be omited
    });
    //const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");
    //const stations = await api.searchStations({
    //  language: stationLanguage,
    //  tag: stationFilter,
    //  limit: 18,
    //});

    return stations;
  };

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  const languages = ["english", "slovak", "german", "polish", "french"];

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  return (
    <div className="radio">
      <div className="languages">
        {languages.map((lang, index) => {
          return (
            <span
              key={index}
              className={stationLanguage === lang ? "selected" : ""}
              onClick={() => setStationLanguage(lang)}
            >
              {lang}
            </span>
          );
        })}
      </div>
      <div className="filters">
        {filters.map((filter, index) => {
          return (
            <span
              key={index}
              className={stationFilter === filter ? "selected" : ""}
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </span>
          );
        })}
      </div>
      {showMessage && (
        <div className="loading-wrapper">
          <div className="message">Loading stations ...</div>
        </div>
      )}
      <div className="stations">
        {stations &&
          stations.map((station, index) => {
            let resolvedUrl = "" + station.urlResolved;
            if (resolvedUrl.indexOf("http://") === 0) {
              resolvedUrl = resolvedUrl.replace("http://", "https://");
            }
            return (
              <div className="station" key={index}>
                <div className="stationName">
                  <img
                    className="logo"
                    src={station.favicon}
                    alt="Station logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">{station.name}</div>
                </div>

                <AudioPlayer
                  className="player"
                  src={resolvedUrl}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
