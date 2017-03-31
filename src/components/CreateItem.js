import React from 'react';

class CreateItem extends React.Component {

	componentWillMount() {
		// this.ref = base.syncState(`{this.props.params.user`)
		console.log(this.props.params);
	}

	createItem(event) {
		event.preventDefault();

		const item = {
			task: this.task.value
		}

		// add the item
		this.props.addTask(item);
		this.taskForm.reset();
	}

	render() {
		return(
			<form ref={(input) => this.taskForm = input} className="create-item" onSubmit={this.createItem.bind(this)}>
				<input ref={(input) => this.task = input} type="text" className="create-item__form" placeholder="Create To Do" />
				<button className="create-item__button">Create</button>
			</form>
		);
	}
}

export default CreateItem;