"use client"
import { Provider } from "react-redux";
import Game from "./_components/Game";
import store from "./_lib/redux/store";

export default function Home() {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-10">
            <Provider store={store}>
                <Game />
            </Provider>
        </div>
    );
}
