import React, { Component } from 'react';
import './css/PageCss.css'; 

const url =   "ws://stocks.mnet.website";

export default class App extends Component {
  
  constructor() {
	super();
	//
	this.state = {
		stockData: {},
		prevPrice: ''
	}
  }  
  
  componentDidMount() {
	
	// web socket connection
	this.wsConnection = new WebSocket(url);

	// sends the message once connection builds
	this.wsConnection.onopen = () => {
		this.wsConnection.send(Math.random())
	}
	
	// listens updated event 
	this.wsConnection.onmessage = evt => {
		this.updateData(JSON.parse(evt.data))
	}
  }	
  
  updateData = data => {
	let self = this, now = Date.now(),
		sData = self.state.stockData;
	
	// checks it's a first update or not
	if(sData) {
		for(var i in sData) {
			sData[i].isFirstUpdate = false;
		}
	}
	// fetch the response sets the stock data
	data.forEach(([name, price]) => {
		
		if(!sData[name]) {
			sData[name] = {"isFirstUpdate": true, "prevPrice": -1, "prevColor": "#fff", "time": now};
		}
		//
		sData[name].price = price;
		sData[name].lastUpdate = this.getTime(Math.round((now - sData[name].time) / 1000), name);
	});
	//
	this.setState({stockData: sData})
  }
  
  getTime = (lstUpdateTime, currStockName) => {
	
	// calculates the time recieved from 'now'
  	let sec = 0, min = 0, hours = 0, day = 0, str;
  	
  	sec = lstUpdateTime % 60;
  	min = Math.floor(lstUpdateTime / 60);
  	hours = Math.floor(min / 60);
  	day = Math.floor(hours / 24);
	
	str = `${sec} sec`;	
  	
  	if(min > 0) {
  		str = `${min} min`;
  	}
	
  	if (hours > 0) {
  		str =  `${hours} hr ${min} min`
  	}
	
  	if (day > 0) {
  		str = `${day} day(s) ago`	
  	}
	
  	return str;
  }
  
  componentWillUnMount() {  
	this.wsConnection.close();
  }
  
  render() {
	let self = this, cColor, elem,
		stockData = self.state.stockData;
	  
    return (
      <div>
		  <h1 style = {{textAlign: "center", color: "#fff"}}> Live Stock Updates </h1>
		  <div className = "wrapper">
			  <div className = "dTable">
				<div className = "dRow tHead">
					<div className = "dColumn"> Name </div>
					<div className = "dColumn"> Price </div>
					<div className = "dColumn"> Last Update </div>
				</div>
				{Object.keys(stockData).map((key, i) => {
					elem = stockData[key];
					
					cColor = (elem.isFirstUpdate) ? elem.prevColor : (elem.price < elem.prevPrice) ? "#ff0000" : (elem.price > elem.prevPrice) ? "green" : elem.prevColor;
					
					elem.prevPrice = elem.price;
					elem.prevColor = cColor;
					
					return <div key = {i} className = "dRow">
							<div className = "dColumn">{key}</div>
							<div className = "dColumn" style = {{backgroundColor: cColor}}>{elem.price.toFixed(2)}</div>
							<div className = "dColumn"> {elem.lastUpdate} ago</div>
						   </div>
				})}
			  </div>
		  </div>
      </div>
    );
  }
}