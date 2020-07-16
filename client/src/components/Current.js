/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import { ContextUser } from '../components/UserContext';

const spotifyWebApi = new Spotify();

const  Current = () => {
  const {user, setUser} = useContext(ContextUser)
  const [nowPlaying, setNowPlaying] = useState({})
  const [error, setError] = useState('')

  if (user.access_token) {
    spotifyWebApi.setAccessToken(user.access_token)
  }

  async function getNowPlaying () {
    try {
    const playback = await spotifyWebApi.getMyCurrentPlaybackState(user.access_token).catch(err => setError(err.response))
    if (playback) {
      setNowPlaying({name: playback.item.name, image: playback.item.album.images[0].url})
    } else {
      return <p>Nothing found!</p>
    }} catch(error) {
      console.log(error);
    }
  }
  return (
    <div className="Current">
    {error}
    <h2 className="Current__name">Currently Playing: {nowPlaying.name}</h2>
    <button onClick={getNowPlaying}>Check Playback</button>
    <img className="Current__img" alt="album-art" src={nowPlaying.image}></img>
    </div>
  );
}

export default Current;
