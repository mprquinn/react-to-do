// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/styles.css';

import App from './components/App';
import Login from './components/Login';
import NotFound from './components/NotFound';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<h1 className="hero">To Do App</h1>
				<Match exactly pattern="/" component={Login} />
				<Match exactly pattern="/user/:uid" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

render(<Root />, document.querySelector('#main'));