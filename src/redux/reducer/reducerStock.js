import {
	STOCK_DATA_SUCCESS,
	STOCK_DATA_ERROR
} from '../action/actions';

import common from '../../common/common';

const initialState = {
	stockData: {}
}

const reducerStock = function(state = initialState, action) {
	switch(action.type) {
		
		case STOCK_DATA_SUCCESS:
		
			let res = action.payload, sData = {...state.stockData}, now = Date.now();
			
			// checks for the first update
			if(sData) {
				for(let i in sData) {
					sData[i].isFirstUpdate = false;
				}
			}
			
			// on basis of response recieved sets the stock data
			res.forEach(([name, price]) => {
				
				if(!sData[name]) {
					sData[name] = {"isFirstUpdate": true, "prevPrice": -1, "prevColor": "#fff", "time": now}
				}
				//
				sData[name].price = price;
				sData[name].lastUpdate = common.getTime(Math.round((now - sData[name].time) / 1000), name);
			});
			
			state = {
				...state,
				stockData: sData
			}
		
			return state;
		case STOCK_DATA_ERROR:
		
			state = {
				...state,
				stockData: {}
			}
			
			return state;
			
		default: 
			return state;
	}
}

export default reducerStock;