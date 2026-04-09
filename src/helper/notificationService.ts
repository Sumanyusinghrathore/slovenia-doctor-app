// import messaging from '@react-native-firebase/messaging';

// /**
//  * Requests user permission for push notifications and retrieves the token if authorized.
//  * @param set - A function to handle the retrieved token.
//  */
// export const requestUserPermission = async (
//   set: (token: string) => void,
// ): Promise<void> => {
//   try {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       await getToken(set);
//     }
//   } catch (error) {
//     console.log('Error requesting user permission:', error);
//   }
// };

// /**
//  * Retrieves the FCM token and invokes the provided callback with the token.
//  * @param up - A function to handle the retrieved token.
//  */
// const getToken = async (up: (token: string) => void): Promise<void> => {
//   try {
//     const token = await messaging().getToken();
//     up(token);
//   } catch (error) {
//     console.log('Error getting push token:', error);
//   }
// };
