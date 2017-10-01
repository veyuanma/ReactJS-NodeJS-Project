import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';


import "./QuickAccess.css";

const links = [
			{"name": "React", 
			"url": "https://facebook.github.io/react/", 
			"description": "a JavaScript library for building user interfaces",
			"image": './logos/react.png'
			},
			{"name": "Airbnb", 
			"url": "https://zh.airbnb.com/",
			"description": "an online marketplace and hospitality service, enabling people to lease or rent short-term lodging",
			"image": './logos/airbnb.png'
			},
			{"name": "CNN 10", 
			"url": "http://www.cnn.com/cnn10",
			"description": "10-minute news show that appears as a daily digital video on CNN.com",
			"image": './logos/cnn.png'
			},
			
			{"name": "YouTube", 
			"url": "https://www.youtube.com/",
			"description": "an American video-sharing website",
			"image": './logos/youtube.jpg'
			}
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
		
		return(
			<div>

			    <Row className="show-grid">
			      <Col md={4}>
			      	<div className="item">
						<img className="logo" src="https://cdn-images-1.medium.com/max/675/1*oi8WLwC2u0EEI1j9uKmwWg.png" alt={this.props.links[0].name} />
						<div className="weblink">
							<h3><a href={this.props.links[0].url} target="_blank">{this.props.links[0].name}</a></h3>
							<h4><span className="label label-success">Web</span></h4>
						</div>
					</div>
			      </Col>

			      <Col md={4}>
			      	<div className="item">
						<img className="logo" src="http://kintudesigns.com/wp-content/uploads/2016/11/angularjs.jpg" alt="angularjs" />
						<div className="weblink">
							<h3><a href="https://angularjs.org/" target="_blank">Angular</a></h3>
							<h4><span className="label label-success">Web</span></h4>
						</div>
					</div>
			      </Col>

			    </Row>

			    <Row className="show-grid">
			      <Col md={4}>
			      	<div className="item">
						<img className="logo" src="https://a0.muscache.com/airbnb/static/logos/belo-1200x630-a0d52af6aba9463c82017da13912f19f.png" alt={this.props.links[1].name} />
						<div className="weblink">
							<h3><a href={this.props.links[1].url} target="_blank">{this.props.links[1].name}</a></h3>
							<h4><span className="label label-info">Travel</span></h4>
						</div>
					</div>
			      </Col>
			    </Row>
			    <Row className="show-grid">
			      <Col md={4}>
			      	<div className="item">
						<img className="logo" src="http://i.cdn.cnn.com/cnn/.e/img/3.0/global/misc/cnn-logo.png" alt={this.props.links[2].name} />
						<div className="weblink">
							<h3><a href={this.props.links[2].url} target="_blank">{this.props.links[2].name}</a></h3>
							<h4><span className="label label-warning">News</span></h4>
						</div>
					</div>
			      </Col>
			    </Row>
			    <Row className="show-grid">
			      <Col md={4}>
			      	<div className="item">
						<img className="logo" src="http://i0.kym-cdn.com/entries/icons/original/000/004/562/maxresdefault.jpg" alt={this.props.links[3].name} />
						<div className="weblink">
							<h3><a href={this.props.links[3].url} target="_blank">{this.props.links[3].name}</a></h3>
							<h4><span className="label label-danger">Fun</span></h4>
							<h4><span className="label label-primary">Video</span></h4>
						</div>
					</div>
			      </Col>
			    </Row>
			    

			    
			

			
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
			<div className="website">
				<img className="logo" src={require('./logos/react.png')} alt={this.props.name} />
				<div className="webdetail">
				<h3><a href={this.props.url} target="_blank">{this.props.name}</a></h3>
				<p>{this.props.description}</p>
				</div>
				<br/>
			</div>
		);
	}
}

export default QuickAccess;

