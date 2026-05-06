import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "@/app/_lib/redux/boardSlice";
import gameReducer from "@/app/_lib/redux/gameSlice";
import choicesReducer from "@/app/_lib/redux/choicesSlice";

const store = configureStore({
    reducer: {
        board: boardReducer,
        game: gameReducer,
        choices: choicesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
