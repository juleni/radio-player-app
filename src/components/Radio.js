// import { RadioPlayer } from "iradio.player.js";
import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import dataStations from "../data/my-stations.json";
import defaultImage from "../default-radio-station.jpg";

export default function Radio() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");
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
    /**
     * TODO: Do this api as 2nd method for getting stations - implement switch in settings
     * Radio player retrieves lots of stations but not all are playing and there are duplicates as well
    const api = new RadioPlayer();
    const stations = await api.searchStations({
      countryCode: "SK",
      // language: stationLanguage,
      tag: stationFilter === "all" ? "" : stationFilter,
      limit: 1000,
      offset: 0, // this is the default - can be omited
    });
    // console.log(JSON.stringify(stations));
    **/
    if (stationFilter === "all") return dataStations;
    else {
      const filteredStations = dataStations.filter((st) =>
        st.tags.includes(stationFilter)
      );
      return filteredStations;
    }
  };

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  // const languages = ["english", "slovak", "german", "polish", "french"];

  const filters = [
    "all",
    "various",
    "rock",
    "pop",
    "dance",
    "oldies",
    "jazz",
    "classical",
    "rtvs",
    "child",
  ];

  return (
    <div className="radio">
      {/*
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
      */}
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
                  volume={0.5}
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
