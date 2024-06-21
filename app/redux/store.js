import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
// import videoSlice from "./videoSlice.js";
// import commentSlice from "./comment.Slice.js";

import { persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// import Video from "../src/pages/video.jsx";
import videoSlice from "./videoSlice.js";
import commentSlice from "./comment.Slice.js";


const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const rootReducer = combineReducers({user: userSlice,Video: videoSlice, comment: commentSlice});
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    })
   
},
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store)