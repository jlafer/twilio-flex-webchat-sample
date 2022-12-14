import { render } from "react-dom";
import { Provider } from "react-redux";
import { webchatInit, WebchatWidget } from "twilio-flex-webchat-widget";

import configureStore, { StoreWithInjector } from "./store/configureStore";
import { ConfigState } from "./store/definitions";
import { initLogger } from "./logger";

const initWebchat = async (config: ConfigState) => {
    initLogger();
    const store = configureStore({});
    webchatInit(config, store);
    const rootElement = document.getElementById("twilio-webchat-widget-root");

    render(
        <Provider store={store}>
            <WebchatWidget />
        </Provider>,
        rootElement
    );

    window.store = store;
};

declare global {
    interface Window {
        Twilio: {
            initWebchat: (config: ConfigState) => void;
        };
        store: StoreWithInjector;
    }
}

// Expose `initWebchat` function to window object
Object.assign(window, {
    Twilio: {
        initWebchat
    }
});
