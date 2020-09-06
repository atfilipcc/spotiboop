/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Spotify from "spotify-web-api-js";
import { ContextUser } from "../components/UserContext";
import ListView from "../components/ListView";

const spotifyWebApi = new Spotify();

const TopList = ({ getRefreshToken }) => {
  const { user, setUser } = useContext(ContextUser);
  const [topTracks, setTopTracks] = useState([]);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const getTopList = (period) => {
    spotifyWebApi.setAccessToken(user.access_token);
    spotifyWebApi
      .getMyTopTracks({ limit: 30, time_range: period })
      .then((res) => {
        setTopTracks(Object.values(res)[0]);
      })
      .catch((err) => {
        if (err.status === 401) {
          getRefreshToken();
          setMessageHelper("Please try again.");
        }
      });
  };

  const handleGenerateRecommendation = async (
    songName,
    artistName,
    songId,
    artistId
  ) => {
    spotifyWebApi.setAccessToken(user.access_token);
    const artistGenre = await spotifyWebApi.getArtist(artistId);
    const audioFeatures = await spotifyWebApi.getAudioFeaturesForTrack(songId);
    const { tracks } = await spotifyWebApi.getRecommendations({
      limit: 30,
      seed_tracks: [songId.toString()],
      seed_artists: [artistId.toString()],
      seed_genre: artistGenre,
      acousticness: audioFeatures.acousticness,
      danceability: audioFeatures.danceability,
      energy: audioFeatures.energy,
      instrumentalness: audioFeatures.instrumentalness,
      key: audioFeatures.key,
      liveness: audioFeatures.liveness,
      loudness: audioFeatures.loudness,
      mode: audioFeatures.mode,
      speechiness: audioFeatures.speechiness,
      tempo: audioFeatures.tempo,
      time_signature: audioFeatures.time_signature,
      valence: audioFeatures.valence,
    });
    createSpotifyPlaylist(tracks, {
      name: `Tracks based on ${songName} by ${artistName}`,
      description: "From Spotiboop.",
    });
  };

  const createSpotifyPlaylist = (tracksToMap, { name, description }) => {
    const mappedUris = tracksToMap.map((track) => track.uri);
    spotifyWebApi.createPlaylist(
      user.id,
      {
        name: name,
        public: true,
        collaborative: false,
        description: description,
      },
      (err, res) => {
        if (err) return setError({ error: err });
        if (res.id)
          spotifyWebApi
            .addTracksToPlaylist(res.id, mappedUris)
            .catch((err) => console.log(err.response));
      }
    );
  };
  const disableTermButton = (e) => {
    const buttons = document.getElementsByClassName("TopList__buttons--button");
    for (let i = 0; i < buttons.length; i++) buttons[i].disabled = false;
    e.target.disabled = true;
  };

  const disableCreateButton = (e) => {
    const button = e.target;
    button.disabled = true;
    setTimeout(() => {
      button.disabled = false;
    }, 3000);
  };

  const setMessageHelper = (msg) => {
    setMessage({ message: msg });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const renderDynamicButtons = (period) =>
    user &&
    user.access_token && (
      <button
        id={period}
        className="TopList__buttons--button"
        onClick={(e) => {
          getTopList(period);
          disableTermButton(e);
        }}
      >
        {period.replace(period[0], period[0].toUpperCase()).replace("_", " ")}
      </button>
    );

  return (
    <div className="TopList">
      <h1 className="TopList__title">Your Top Tracks</h1>

      {user && !user.access_token ? (
        <p className="message">Please log in to use this functionality.</p>
      ) : (
        <section className="TopList__buttons">
          {renderDynamicButtons("long_term")}
          {renderDynamicButtons("medium_term")}
          {renderDynamicButtons("short_term")}
        </section>
      )}
      {topTracks.length > 0 && (
        <button
          className="TopList__createButton"
          onClick={(e) => {
            disableCreateButton(e);
            createSpotifyPlaylist(topTracks, {
              name: "Your Top Tracks",
              description: "From Spotiboop.",
            });
            setMessageHelper("Playlist created!");
          }}
        >
          Create playlist
        </button>
      )}
      {error && <p className="message">{error.error}</p>}
      {message && <p className="message">{message.message}</p>}
      <ul className="TopList__list">
        {topTracks && (
          <ListView
            items={topTracks}
            handleGenerateRecommendation={handleGenerateRecommendation}
            setMessageHelper={setMessageHelper}
          />
        )}
      </ul>
    </div>
  );
};

export default TopList;
