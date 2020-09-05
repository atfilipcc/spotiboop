/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { ContextUser } from "../components/UserContext";

const ListView = ({ items, handleGenerateRecommendation, setMessageHelper }) => {
  const { user, setUser } = useContext(ContextUser);
  const [playing, setPlaying] = useState([]);

  const playSong = (e) => {
    const audio = e.target.nextSibling.nextSibling;
    if (playing.length !== 0) {
      // TODO: one track at a time
    }
    audio.volume = 0.1;
    if (audio.paused) {
      audio.play();
      setPlaying(audio);
    } else {
      audio.pause();
      setPlaying([]);
    }
  };

  return (
    <section>
      {items &&
        items.map((item, index) => {
          const songName = item.name;
          const artistName = item.artists[0].name;
          const artistId = item.artists[0].id;
          const songPreview = item.preview_url;
          const songId = item.id;
          const imageUrl = item.album.images[1].url;
          return (
            <>
            <article
              key={`${songName} ${artistName}`}
              className="TopList__song--wrapper"
            >
              {item.preview_url !== null && (
                <div className="TopList__playpause--wrapper">
                  <div className={`playpause ${songName.replace(/ /g, "")}`}>
                    <input
                      onClick={(e) => playSong(e)}
                      type="checkbox"
                      defaultChecked={true}
                      value="None"
                      id={`playpause ${songId}`}
                      name="check"
                    />
                    <label
                      title="Preview track"
                      onClick={void 0}
                      htmlFor={`playpause ${songId}`}
                      tabIndex="1"
                      id={`label ${songId}`}
                    ></label>
                    <audio
                      loop
                      volume="0.1"
                      id={`${songId}`}
                      key={`playback ${songId}`}
                      src={songPreview}
                    />
                  </div>
                  <button className="smallButton" onClick={() => {
            handleGenerateRecommendation(songName, artistName, songId, artistId)
            setMessageHelper("Playlist created!");
            }}>+</button>
                </div>


              )}
              <div className="TopList__content">
                <li key={`${songName-artistName}`} className="TopList__song">{`${
                  index + 1
                } - ${artistName} - ${songName}`}</li>
              </div>
              <img
                className="TopList__image"
                alt={songName}
                src={imageUrl}
              ></img>
            </article>
            </>
          );
        })}
    </section>
  );
};

export default ListView;
