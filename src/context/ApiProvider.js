import { jsx as _jsx } from "react/jsx-runtime";
import { ApiContext } from './api-context';
export function ApiProvider({ children }) {
    return (_jsx(ApiContext.Provider, { value: {
            apiBaseUrl: 'https://restaurant-be-400174736012.asia-southeast2.run.app',
        }, children: children }));
}
