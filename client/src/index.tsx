import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore, applyMiddleware, compose, AnyAction, StoreEnhancer } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


const store = createStore(rootReducer, applyMiddleware(thunk));

// Define RootState and AppThunk types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;
export default store;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

