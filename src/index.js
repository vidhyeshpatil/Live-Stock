import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import './css/PageCss.css'; 
import LiveStock from './components/LiveStock';

const RenderView = () => {
	return <Provider store = {store}>
			<LiveStock />
		   </Provider>
}

ReactDOM.render(<RenderView />, document.getElementById('root'));
registerServiceWorker();
