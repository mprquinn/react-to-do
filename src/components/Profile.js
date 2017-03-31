import React from 'react';

class Profile extends React.Component {
	render () {
		return (
			<div className="profile clearfix">
				<img src={this.props.pic} alt="" className="profile__pic"/>
				<h3 className="profile__name">{this.props.user}</h3>
				<p className="profile__completed">Tasks completed: <span className="profile__completed__count">{this.props.completed}</span></p>
			</div>
		);
	}
}

export default Profile;