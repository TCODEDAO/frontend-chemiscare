import { configureStore, combineReducers } from '@reduxjs/toolkit'

//Redux persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//Slice reduce
import AlertSlice from '../reducers/AlertSlice'
import AuthSlice from '../reducers/AuthSlice'
import PostsSlice from '../reducers/PostsSlice'
import QuizSlice from '../reducers/QuizSlice'
// const store = configureStore({ reducer: AlertSlice }, composeWithDevTools())
const rootReducer = combineReducers({
    auth: AuthSlice,
    alert: AlertSlice,
    quiz: QuizSlice,
    posts: PostsSlice
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'posts', 'quiz'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)
