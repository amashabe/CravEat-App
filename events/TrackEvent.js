import * as analytics from 'expo-firebase-analytics';

export const trackAuth = (method, attribs) => {
    return () => {
        analytics.logEvent(method, attribs)
    }
}