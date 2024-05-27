import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';



// Define RootState and AppThunk types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
    >;

const preloadedState = {
    posts: [],
    authData: { authData: null }
};

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
export default store;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

