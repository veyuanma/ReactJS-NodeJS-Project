import React from 'react';
import ReactDOM from 'react-dom';

import './LetterPage.css';


class LetterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pick: false,
			write: false,
			message: "init"
		};

		this.handlePickClick = this.handlePickClick.bind(this);
		this.handleWriteClick = this.handleWriteClick.bind(this);
		this.handleLetterSubmit = this.handleLetterSubmit.bind(this);
		this.handleLetterRequest = this.handleLetterRequest.bind(this);
		this.showState = this.showState.bind(this);
	}

	handleLetterSubmit(data) {

		fetch("http://localhost:3000/newletter", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				letter: data
			})
		})
		.then((response) => response.json())
        .then((message) => {
        	alert("your submit is " + message.status);
        });

	}

	showState() {
		this.setState({message: this.state.message}, () => {
			console.log("in showState " + this.state.message);
		});
	}

	handleLetterRequest() {

		console.log("before fetch...");

		let request = new Request('http://localhost:3000/randomletter', {
      		method: 'GET',
      		cache: false
    	});

    	fetch(request)
      	.then((res) => res.json())
      	.then((responseJson) => {
      		console.log("response string is " + responseJson.content);
      		
        	this.setState({
          		message:responseJson.letter
        	});
      	});

     	

      	this.showState();

	}

	handlePickClick() {
		
		console.log("pick handler");
		this.setState({pick: true}, () => {
			console.log("pick is clicked? " + this.state.pick);
		});
		
		this.handleLetterRequest();

	}

	handleWriteClick() {
		console.log("in write handler");
		this.setState({write: true});
	}

	

	render() {
		return(
			<div className="letterpage">

				<button className="btn btn-info pickbtn" onClick={this.handlePickClick}>Pick one letter</button>
				<button className="btn btn-info writebtn" onClick={this.handleWriteClick}>Write new Letter</button>
				
			<div className="container">
			<div className="row">
				<div className="col">
					{(this.state.pick == true) ? <RandomLetter message={this.state.message} /> : null}
				</div>
				<div className="col newletter">
					{(this.state.write == true) ? <NewLetter onLetterSubmit={this.handleLetterSubmit}/> : null}
				</div>
			</div>
			</div>
				
			</div>
		);
	}

	
}


class RandomLetter extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return(
			<div className="randomletter">
				<div>{this.props.message}</div>
			</div>
			
		);
	}
}

class NewLetter extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const msg = this.refs.content.value;
		console.log("msg to submit " + msg);
		console.log("type of onNewLetterSubmit " + typeof(this.props.onLetterSubmit));
		this.props.onLetterSubmit(msg);
	}

	render() {
		return(
			
				<form onSubmit={this.handleSubmit}>	
					<textarea className="lettertext" ref="content" placeholder="Dear friend, Nice to meet you..."/>
					<button className="btn btn-info">Submit</button>
				</form>	
			
		);
		
	}
}

export default LetterPage;


