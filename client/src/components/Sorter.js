/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import { ContextUser } from './UserContext';

const spotifyWebApi = new Spotify();

const  Sorter = () => {
  const {user, setUser} = useContext(ContextUser);
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState('');
  const [tracks, setTracks] = useState('');

  if (user.access_token) {
    spotifyWebApi.setAccessToken(user.access_token)
  }

  const getAllSongsAndSort = async () => {
    const tracks = [];
    const res = await spotifyWebApi.getUserPlaylists(user.id, {limit: 30})
    const array = await res.items.map(item => item.id)
    await array.forEach(item => spotifyWebApi.getPlaylistTracks(item).then(res => tracks.push(res)))
    await console.log(tracks)
    }


      // .then(array => array.forEach(item => spotifyWebApi.getPlaylistTracks(item)
      // .then(array => setPlaylists(array)
      // .catch(err => console.log(err))
  return (
    <div className="Sorter">
    {error}
    <button onClick={getAllSongsAndSort}>Get Playlists</button>
    </div>
  );
}

export default Sorter;
