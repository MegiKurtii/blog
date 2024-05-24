import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers as any, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
