import React from 'react';
import CreateItem from './CreateItem';
import Task from './Task';
import base from '../base';

class App extends React.Component {

	constructor() {
		super();

		this.addTask = this.addTask.bind(this);
		this.completeTask = this.completeTask.bind(this);

		// set state!
		this.state = {
			user: null,
			tasks: {},
			completed: 0
		};
	}

	componentWillMount() {
		// console.log('APP WILL MOUNT')
		// console.log(this.props.params);
		// lets load up the database
		this.ref = base.syncState(`${this.props.params.userName}/tasks`, {
			context: this,
			state: 'tasks'
		});

		console.log(this.props.params.userName);

		console.log(this);
	}

	addTask(task) {
		const tasks = {...this.state.tasks};
		const timeStamp = Date.now();
		tasks['task-'+timeStamp] = task.task;
		this.setState({ tasks: tasks });
	}

	completeTask(task) {
		const tasks =  {...this.state.tasks};
		delete(tasks[task.props.index]);
		
		this.setState({ tasks, completed: this.state.completed+1 });
	}

	render() {
		return(

			<div className="app-wrapper">
				
				<CreateItem addTask={this.addTask} />

				<ul className="task__wrapper">
					{
						Object.keys(this.state.tasks).map(key => <Task key={key} index={key} desc={this.state.tasks[key]} completeTask={this.completeTask} />)
					}
				</ul>

				{/* <h2>Completed items: {this.state.completed}</h2> */}
			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;