import React from 'react';
import ReactDOM from 'react-dom';

import './LetterPage.css';


class LetterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:"",
			letter: false,
			message: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		
	}

	handleChange(event) {
		this.setState({value:event.target.value});
	}

	handleSubmit(event) {

		console.log('An letter submitted: ' + this.state.value);
		event.preventDefault();

		console.log(JSON.stringify({letter: this.state.value}));

		fetch('http://localhost:3000/newletter', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				letter: this.state.value
			})
		})
		.then((response) => response.json())
        .then((message) => {
        	alert("your submit is " + message.status);
        });

	}

	handleClick() {
		fetch('http://localhost:3000/randomletter')
		.then((response) => response.json())
		.then((msg) => {
			console.log("message is " + msg.let);
			this.setState({
				letter: !this.state.letter
			});
			this.setState({
				message:msg.let
			});
		});

	}

	renderLetter(message) {
		return(
			<div>
				<button type="button" onClick={this.handleClick}>Pick One Letter</button>
				
				<br/>
				
				<p>{this.state.message}</p>
			</div>
		);
	}

	


	render() {
		console.log("is the pick on clicked? " + this.state.letter);
		if (this.state.letter) {
			return(
				<div>
					{this.renderLetter()}
				</div>

			);
			
		}
		else {
			return(
				<div className="container">
					<button className="btn btn-info" onClick={this.handleClick}>Pick One Letter</button>
					<br/>
					<form onSubmit={this.handleSubmit}>	
						<textarea className="newletter" value={this.state.value} onChange={this.handleChange} />
						<button className="btn btn-info">Submit</button>
					</form>	
				</div>

			);
		}


		
	}



	
}

export default LetterPage;


