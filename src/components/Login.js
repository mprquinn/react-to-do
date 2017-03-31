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
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler(err, authData) {
		
		if (err) {
			console.error(err);
			return;
		}

		const slug = authData.user.displayName.replace(' ', '-').toLowerCase();
		const uid = authData.user.uid;
		
		this.setState({ 
			uid: uid,
			username: slug
		});
		
		localStorage.setItem('username', slug);
		localStorage.setItem('user_id', uid);
		// set up firebase ref
		const databaseRef = base.database().ref();
		const userRef = base.database().ref(uid);
		// console.log(this.props.userName);
		// query firebase
		userRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};
			console.log(data);
			if (!data.user_id) {
				userRef.set({
					user: authData.user.displayName.replace(' ', '-').toLowerCase(),
					user_id: uid
				});
			} else {
				console.log('we have a uid');
			}


		});

		this.goToApp();

	}

	goToApp() {
		const slug = this.state.username;
		const uid = this.state.uid;
		// console.log(this);
		this.context.router.transitionTo(`/user/${uid}`);
	}


	render () {
		return (
			<button className="login login--facebook" onClick={() => this.authenticate('facebook')}>
				Log in With Facebook
			</button>
		);
	}
}

Login.contextTypes = {
	router: React.PropTypes.object
}

export default Login;