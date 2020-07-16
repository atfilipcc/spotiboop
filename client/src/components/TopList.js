/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import Spotify from 'spotify-web-api-js';
import { ContextUser } from '../components/UserContext';

const spotifyWebApi = new Spotify();

const TopList = ({ getRefreshToken }) => {
	const { user, setUser } = useContext(ContextUser);
	const [topTracks, setTopTracks] = useState([]);
	const [isPlaying, setPlaying] = useState([]);
  const [error, setError] = useState({});
  const [message, setMessage] = useState('');

  const getTopList = (period) => {
		spotifyWebApi.setAccessToken(user.access_token);
		spotifyWebApi.getMyTopTracks({limit: 30, time_range: period }).then(res => {
			console.log(res);
			setTopTracks(Object.values(res)[0]);
    }).catch(err => {
      if (err.status === 401) {
        getRefreshToken();
        setMessageHelper('Please try again.')
    }
  })}

  const playSong = e => {
		const audio = e.target.nextSibling.nextSibling;
		audio.volume = 0.1;
		if (audio.paused) {
			audio.play();
			setPlaying(audio);
		} else {
			audio.pause();
			setPlaying([]);
		}
	}

	const addToPlayList = () => {
		const tracks = topTracks.map(track => track.uri);
		spotifyWebApi.createPlaylist(
			user.id,
			{
				name: 'Your Top Tracks',
				public: true,
				collaborative: false,
				description: 'Your most listened to songs.',
			},
			(err, res) => {
				if (err) return setError({error: err});
        if (res.id) spotifyWebApi.addTracksToPlaylist(res.id, tracks)
        .catch(err => console.log(err.response))
      }
		);
	}

	const disableButton = e => {
		const buttons = document.getElementsByClassName('TopList__buttons--button');
		for (let i = 0; i < buttons.length; i++) buttons[i].disabled = false;
		e.target.disabled = true;
  };

  const setMessageHelper = (msg) => {
    setMessage({message: msg})
    setTimeout(() => {
      setMessage('')
    }, 5000);
  }

	const renderDynamicButtons = period =>
		user.access_token && (
			<button
				id={period}
				className='TopList__buttons--button'
				onClick={e => {
					getTopList(period);
					disableButton(e);
				}}
			>
				{(period.replace(period[0], period[0].toUpperCase()).replace('_', ' '))}
			</button>
		);

	return (
		<div className='TopList'>
			<h1 className='TopList__title'>Your Top Tracks</h1>

			{!user.access_token && (
				<p className='message'>Please log in to use this functionality.</p>
			)}
			<section className='TopList__buttons'>
				{renderDynamicButtons('long_term')}
				{renderDynamicButtons('medium_term')}
				{renderDynamicButtons('short_term')}
			</section>
			{topTracks.length > 0 && (
				<button onClick={() => {
          // addToPlayList()
          setMessageHelper('Playlist created!')
          }}>Create playlist</button>
			)}
      {error && <p className="message">{error.error}</p>}
      {message && <p className="message">{message.message}</p>}
			<ul className='TopList__list'>
				{topTracks &&
					topTracks.map((item, index) => (
						<article key={`${item.name} ${item.id}`} className='TopList__song--wrapper'>
            {item.preview_url !== null &&
							<div className='TopList__playpause--wrapper'>
								<div className={`playpause ${item.name}`}>
									<input
										onClick={e => playSong(e)}
										type='checkbox'
										defaultChecked={true}
										value='None'
										id={`playpause ${item.name}`}
										name='check'
									/>
									<label
										htmlFor={`playpause ${item.name}`}
										tabIndex='1'
									></label>
									<audio
										loop
										volume='0.1'
										className={`audio_${item.name}`}
										key={`playback ${item.name}`}
										src={item.preview_url}
									/>
								</div>
							</div>}
							<div className='TopList__content'>
								<li key={item.name} className='TopList__song'>{`${
									index + 1
								} - ${item.artists[0].name} - ${item.name}`}</li>
							</div>
							<img
								className='TopList__image'
                alt={item.name}
								src={item.album.images[1].url}
							></img>
						</article>
					))}
			</ul>
		</div>
	);
};

export default TopList;
