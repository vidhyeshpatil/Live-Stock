import React, { Component } from 'react';
import * as Actions from '../redux/action/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
 
export class LiveStock extends Component {
  
  componentWillMount() {
	
	// create web socket connection
	this.props.triggerFetchStockData();
  }
  
  render() {
	if(!Object.keys(this.props.stockData).length) return null;
	
	let stockData = this.props.stockData, cColor, elem;
	  
    return (
      <div>
		  <h1 style = {{textAlign: "center", color: "#000"}}> Live Stock Updates </h1>
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

function mapStateToProps(state, props) {
	
	let {
		stockData
		
	} = state.reducerStock;
	
	return {stockData}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveStock);