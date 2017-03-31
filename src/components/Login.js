import React from 'react';
import base from '../base';

class Login extends React.Component {

	constructor() {
		super();

		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.goTopApp = this.goToApp.bind(this);

		this.state = {
			uid: null,
			username: null
		}
	}

	authenticate(provider) {
		console.log(`Trying to log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler(err, authData) {
		
		if (err) {
			console.error(err);
			return;
		}

		this.setState({ 
			uid: authData.user.uid,
			username: authData.user.displayName.replace(' ', '-').toLowerCase() 
		});
		
		localStorage.setItem('username', authData.user.displayName.replace(' ', '-').toLowerCase());

		// set up firebase ref
		const userRef = base.database().ref(this.props.userName);

		// query firebase
		userRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};

			if (!data.uid) {
				userRef.set({
					uid: authData.user.displayName.replace(' ', '-').toLowerCase(),
				});

			}


		});
		console.log('Login');
		console.log(this.context);
		this.goToApp();

	}

	goToApp() {
		const slug = this.state.username;
		// console.log(this);
		this.context.router.transitionTo(`/user/${slug}`);
	}


	render () {
		return (
			<button className="facebook" onClick={() => this.authenticate('facebook')}>
				Log in With Facebook
			</button>
		);
	}
}

Login.contextTypes = {
	router: React.PropTypes.object
}

export default Login;