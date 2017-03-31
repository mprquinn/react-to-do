import React from 'react';

class Task extends React.Component {

	render() {
		// console.log(this.props);
		return(
			<li className="task">
				<div className="task__check">
					<a href="#" className="task__complete"  onClick={(e) => this.props.completeTask(this)}>
						👍
					</a>
				</div>
				<div className="task__text">{this.props.desc}</div>
			</li>
		);
	}
}

export default Task;