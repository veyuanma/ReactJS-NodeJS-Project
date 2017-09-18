import React, {PropTypes} from 'react';


class LetterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value:event.target.value});
	}

	handleSubmit(event) {
		alert('An letter submitted: ' + this.state.value);
		event.preventDefault();
	}


	// render() {
	// 	return(
	// 		<div className="letter-page">
	// 			<form>
	// 				<textarea className="letter">
	// 				</textarea>
	// 				<button type="submit">Upload</button>
	// 			</form>
	// 		</div>
	// 	);
	// }
	

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<button className="btn btn-info">Pick Randomly</button>
			</form>		
		);
	}
}