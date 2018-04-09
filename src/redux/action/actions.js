export const STOCK_DATA_SUCCESS = "action/STOCK_DATA_SUCCESS";
export const STOCK_DATA_ERROR = "action/STOCK_DATA_ERROR";


function setWSConnection(
	URL,
	dispatch,
	successAction,
	failedAction
) {
	
	let wsConnection = new WebSocket(URL);

	// sends the message once connection builds
	wsConnection.onopen = () => {
		wsConnection.send(Math.random());
	}
	
	let updatedData;
	wsConnection.onmessage = evt => {
		updatedData = JSON.parse(evt.data)
		getWSConnection(updatedData, dispatch, successAction, failedAction);
	}
}

function getWSConnection(updatedData, dispatch, successAction, failedAction) {
	
	// listens updated event 
	if(updatedData) {
		try {
			dispatch({type: successAction, payload: updatedData});
		} catch(e) {
			dispatch({type: failedAction, payload: []})
		}
	}
}

export function triggerFetchStockData(payload) {
	
	return dispatch => {
		setWSConnection("ws://stocks.mnet.website",
		dispatch,
		STOCK_DATA_SUCCESS,
		STOCK_DATA_ERROR
		)
	}
	
}