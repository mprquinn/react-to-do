import React from 'react';
import CreateItem from './CreateItem';
import Task from './Task';
import base from '../base';
import Profile from './Profile';

class App extends React.Component {

	constructor() {
		super();

		this.addTask = this.addTask.bind(this);
		this.completeTask = this.completeTask.bind(this);
		this.logout = this.logout.bind(this);

		// set state!
		this.state = {
			auth: false,
			user: null,
			tasks: {},
			completed: 0,
			pic: null
		};
	}

	componentWillMount() {
		// console.log('APP WILL MOUNT')
		// lets load up the database
		this.ref = base.syncState(`${this.props.params.uid}/tasks`, {
			context: this,
			state: 'tasks'
		});

	}

	componentDidMount() {
		// console.log(this.props.params.userName);
		if (localStorage.user_id === this.props.params.uid) {
			this.setState({ auth: true });
		}
		
		const picRef = base.database().ref(this.props.params.uid);
		
		picRef.on('value', (snapshot) => {
			const data = snapshot.val() || {};
			this.setState({ pic: data.profile_pic });
			this.setState({ user: data.user });
			this.setState({ completed: data.completed });
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (localStorage.user_id !== this.props.params.uid) {
			console.log('wrong user!!');
			return false;
		} else {
			return true;
		}
	}

	componentWillUpdate(nextProps, nextState) {
	}


	addTask(task) {
		const tasks = {...this.state.tasks};
		const timeStamp = Date.now();
		tasks['task-'+timeStamp] = task.task;
		this.setState({ tasks: tasks });
	}

	completeTask(task) {
		const tasks =  {...this.state.tasks};
		tasks[task.props.index] = null
		// delete does not work with firebase
		this.setState({ tasks: tasks, completed: this.state.completed+1 });

		// do again???
		const moreTasks = {...this.state.tasks};
		delete(moreTasks[task.props.index]);
		this.setState({ tasks: moreTasks, completed: this.state.completed });
	}

	logout(e) {
		e.preventDefault();
		// console.log(this);
		localStorage.setItem('user_id', null);
		this.setState({auth: false});
		this.context.router.transitionTo(`/`);
	}

	render() {
		return(

			<div className="app-wrapper">

				<Profile pic={this.state.pic} user={this.state.user} completed={this.state.completed} />
				
				{ this.state.auth ? (
						<CreateItem addTask={this.addTask} />
					) : (
						<h1>You do not have permission to alter this list</h1>
				)}
					
				
				<ul className="task__wrapper">
					{
						Object.keys(this.state.tasks).map(key => <Task key={key} index={key} desc={this.state.tasks[key]} completeTask={this.completeTask} />)
					}
				</ul>

				{/* <h2>Completed items: {this.state.completed}</h2> */}

				<button className="login login--logout" onClick={(e) => this.logout(e)}>Logout</button>

			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

App.contextTypes = {
	router: React.PropTypes.object
}

export default App;