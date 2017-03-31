import React from 'react';
import CreateItem from './CreateItem';
import Task from './Task';

class App extends React.Component {

	constructor() {
		super();

		this.addTask = this.addTask.bind(this);
		this.completeTask = this.completeTask.bind(this);

		// set state!
		this.state = {
			tasks: {},
			completed: 0
		};
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

export default App;