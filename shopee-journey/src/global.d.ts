declare module 'env';
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '\*.svg' {
  import React = require('react');
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '\*.jpg' {
  const content: string;
  export default content;
}

declare module '\*.png' {
  const content: string;
  export default content;
}

/**
 * This function initializes bridge
 *
 * @param {function} callback
 */
declare var bridgeInit: (callback: () => void) => void;

interface BridgeCallback {
  (response: {
    error: number;
    errorMessage: string;

    data?: string | null;

    image?: string;

    latitude?: number;
    longitude?: number;

    isLoggedIn?: boolean;
  }): void;
}

/**
 * This function call bridge functions to interact with app.
 *
 * @param {string} command
 * @param {object} params
 * @param {function} callback
 */
declare var bridgeCallHandler: (
  command: string,
  params: {},
  callback?: BridgeCallback
) => void;

/**
 * This function subscribes a callback to web event.
 *
 * @param {string} eventName One of 'onShake', 'didTapBack', 'onShow', 'onHide'
 * @param {function} callback
 */
declare var bridgeRegisterHandler: (
  eventName: string,
  callback?: () => void
) => void;

/**
 * This function subscribes a callback to web event.
 *
 * @param {string} eventName One of 'onShake', 'didTapBack', 'onShow', 'onHide'
 * @param {function} callback
 */
declare var bridgeUnRegisterHandler: (eventName: string) => void;

declare var WebViewJavascriptBridge: {
  init: () => void;
};

declare var _isShopeeApp_: boolean;
