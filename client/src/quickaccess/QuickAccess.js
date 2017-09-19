import React from 'react';
import ReactDOM from 'react-dom';

import "./QuickAccess.css";

const links = [
			{"name": "React", "url": "https://facebook.github.io/react/"},
			{"name": "Airbnb", "url": "https://zh.airbnb.com/"},
			{"name": "CNN 10", "url": "http://www.cnn.com/cnn10"},
			{"name": "Regular Expression", "url": "https://regex101.com/"},
			{"name": "YouTube", "url": "https://www.youtube.com/"}
			];



class QuickAccess extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<WebsiteList links={links} />
			</div>
		);
	}
}

class WebsiteList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const websites = this.props.links.map(function(e) {
			return <Website name={e.name} url={e.url} />
		});
		return(
		<div className="websites">
			<div className="container">
				{websites}
			</div>
		</div>
		);
	}
}

class Website extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h3><a href={this.props.url}>{this.props.name}</a></h3>
				<br/>
			</div>
		);
	}
}

export default QuickAccess;

