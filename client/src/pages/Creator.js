import React, {useState, useContext, useRef, useEffect} from 'react';
import Spotify from 'spotify-web-api-js';
import { ContextUser } from '../components/UserContext';
import ListView from '../components/ListView.js'

const spotifyWebApi = new Spotify();

const Creator = () => {
  const {user, setUser} = useContext(ContextUser)
  const [searchResult, setSearchResult] = useState(null)

  const searchRef = useRef(null);

  const searchForSong = (e) => {
    e.preventDefault();
    if (user.access_token) {
      spotifyWebApi.setAccessToken(user.access_token)
      spotifyWebApi.search(searchRef.current.value, ['track', 'artist'])
        .then(res => setSearchResult(res.tracks.items))
    }
  };

  {return user && user.access_token ?
  (
    <div>
    <form>
      <input ref={searchRef}></input>
      <button onClick={(e) => searchForSong(e)}>Search</button>
    </form>
    {searchResult && <ListView items={searchResult} />}
    </div>
  ) : <div>Please log in to use this feature.</div>}
}

export default Creator;
