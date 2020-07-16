import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import Layout from '../components/Layout';
import About from '../components/About';
import Current from '../components/Current';
import TopList from '../components/TopList';
import Sorter from '../components/Sorter';
import { ContextUser } from '../components/UserContext';
import qs from 'query-string';
import axios from 'axios';
const now = new Date();

const AppRouter = () => {
  const loggedOutState = {
      access_token: '',
      refresh_token: '',
      name: '',
      id: '',
      expiry: ''
    }
	const [user, setUser] = useState(loggedOutState);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	useEffect(() => {
		const tokens = qs.parse(window.location.search);
		if (tokens.access_token && !user.name.length) {
			axios
				.get('https://api.spotify.com/v1/me', {
					headers: { Authorization: 'Bearer ' + tokens.access_token },
				})
				.then(res => {
          console.log(res)
					setUser({
						access_token: tokens.access_token,
						refresh_token: tokens.refresh_token,
						name: res.data.display_name,
						id: res.data.id,
						expiry: now.getTime(),
					})
				})
    }
	}, []);

	useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userToken = JSON.parse(token);
    setUser(userToken);
	}, []);

	useEffect(() => {
		const json = JSON.stringify(user);
    localStorage.setItem('userToken', json);
  }, [user]);

	const logOutUser = () => {
		localStorage.removeItem('userToken');
    setUser(loggedOutState);
  };

  const getRefreshToken = () => {
    axios.get(`/refresh_token?refresh_token=${user.refresh_token}`)
      .then(res => setUser({...user, access_token: res.data.access_token}))
  }

	return (
		<ContextUser.Provider value={value}>
			<Router>
				<Layout>
					<>
						<Switch>
							<Route path='/' exact>
								<App />
							</Route>
							<Route path='/callback' exact component={App} />
							<Route path='/about' component={About} />
							<Route path='/current' component={Current} />
							<Route path='/toplist' >
                <TopList getRefreshToken={getRefreshToken} />
              </Route>
						</Switch>
					</>
				</Layout>
			</Router>
		</ContextUser.Provider>
	);
};

export default AppRouter;
