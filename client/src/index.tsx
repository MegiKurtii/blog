import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import Post from './components/posts/post/post';



// Define RootState and AppThunk types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

interface PreloadedState {
    posts: {
        isLoading: boolean;
        posts: typeof Post[]; // You can replace `any` with `Post` if you have defined a Post type
    };
    authData: {
        authData: null;
    };
}

const preloadedState: PreloadedState = {
    posts: {
        isLoading: true,
        posts: []
    },
    authData: {
        authData: null
    }
};

const store = createStore(rootReducer, preloadedState as any, applyMiddleware(thunk));
export default store;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

