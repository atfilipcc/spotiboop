/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'

const ListView = ({
  items,
  handleGenerateRecommendation,
  setMessageHelper,
}) => {
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
                className="ListView__song--wrapper"
              >
                {item.preview_url !== null && (
                  <div className="ListView__playpause--wrapper">
                  <Tippy content="Preview track">
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
                    </Tippy>

                    <Tippy content="Generate playlist based on this song">
                    <button
                      className="ListView__playlistButton"
                      onClick={() => {
                        handleGenerateRecommendation(
                          songName,
                          artistName,
                          songId,
                          artistId
                        );
                        setMessageHelper("Playlist created!");
                      }}
                    >
                      <img
                        alt="Create playlist"
                        className="ListView__playlistImage"
                        src="/images/playlist.svg"
                      ></img>
                    </button>
                    </Tippy>
                  </div>
                )}
                <div className="ListView__content">
                  <li
                    key={`${songName - artistName}`}
                    className="ListView__song"
                  >{`${index + 1} - ${artistName} - ${songName}`}</li>
                </div>
                <img
                  className="ListView__image"
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
