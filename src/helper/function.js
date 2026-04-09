import React from 'react';
import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { useQuery } from 'react-query';
// import {pickSingle, types} from 'react-native-document-picker';
import { apiURL } from './baseUrl';
// import renderToast from './renderToast';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { Tooltip } from '@rneui/themed';
import { requestUserPermission } from './notificationService';
// import ReactNativeBlobUtil from 'react-native-blob-util';
// import Share from 'react-native-share';

export const httpRequestPost = async (
  endpoint,
  params,
  token,
  onMultiPart,
  changeMethod,
) => {
  const serverResponse = {
    status: false,
    data: [],
    error: '',
    message: '',
    statusCode: 200,
  };

  try {
    const { data } = await axios({
      method: changeMethod ?? 'post',
      url: apiURL(endpoint),
      data: params,
      headers: {
        accept: 'application/json',
        'Content-Type': onMultiPart
          ? 'multipart/form-data'
          : 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    serverResponse.status = true;
    serverResponse.data = await data;
  } catch (error) {
    if (error instanceof AxiosError) {
      serverResponse.statusCode = error?.response?.status;
      serverResponse.message = error?.response?.data?.message ?? 'API ERROR';
      serverResponse.error = error?.response?.data?.errors;
    }
  }
  return serverResponse;
};

export const postData = async (endpoint, params, token, onMultiPart) => {
  const serverResponse = {
    status: false,
    data: [],
    error: null,
    message: '',
  };

  try {
    const response = await axios.post(
      apiURL(endpoint),
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': onMultiPart
            ? 'multipart/form-data'
            : 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    console.log('API SUCCESS:', response.data);

    serverResponse.status = true;
    serverResponse.data = response.data;
  } catch (error) {
    console.log('API ERROR:', error);

    serverResponse.message =
      error?.response?.data?.message ||
      error?.message ||
      'API ERROR';

    serverResponse.error = error;
  }

  return serverResponse;
};


export const postMemberData = async (endpoint, params, token, onMultiPart) => {
  const serverResponse = { status: false, data: [], error: '', message: '' };
  try {
    const { data } = await axios({
      method: 'post',
      url: apiURL(endpoint),
      data: params,
      headers: {
        accept: 'application/json',
        ...(onMultiPart
          ? {} // Let Axios set Content-Type for multipart/form-data
          : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
      },
    });
    serverResponse.status = true;
    serverResponse.data = await data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const requestOtp = error?.response?.data?.errors?.verification_required
        ? true
        : false;
      if (error?.response?.status == 422 && requestOtp) {
        serverResponse.status = true;
        serverResponse.message = error?.response?.data?.message ?? 'API ERROR';
      } else {
        serverResponse.message = error?.response?.data?.message ?? 'API ERROR';
      }
    } else {
      serverResponse.error = error;
    }
  }
  return serverResponse;
};

export const getData = async (endpoint, params = {}, token) => {
  const serverResponse = {
    status: false,
    data: [],
    error: '',
    message: '',
    statusCode: 200,
  };
  try {
    const { data } = await axios({
      method: 'get',
      url: apiURL(endpoint),
      params: params,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    serverResponse.status = true;
    serverResponse.data = response.data; //
    serverResponse.meta = data?.meta || {}; // ✅ include meta info
    serverResponse.message = data?.message || '';
  } catch (error) {
    if (error instanceof AxiosError) {
      serverResponse.statusCode = error?.response?.status;
      serverResponse.message = error?.response?.data?.message ?? 'API ERROR';
    }
  }
  return serverResponse;
};

export const fetchData = async (
  endpoint,
  params,
  token,
  changeMethod,
  onMultiPart,
) => {
  const serverResponse = {
    status: false,
    data: [],
    error: '',
    message: '',
    statusCode: 200,
  };

  try {
    const axiosConfig = {
      method: changeMethod ?? 'get',
      url: apiURL(endpoint),
      data: params,
    };
    // console.log('axiosConfig', axiosConfig);

    if (
      changeMethod === undefined ||
      !params ||
      (typeof params === 'object' && Object.keys(params).length === 0)
    ) {
      delete axiosConfig.data;
    }

    const { data } = await axios({
      ...axiosConfig,
      headers: {
        accept: 'application/json',
        'Content-Type': onMultiPart
          ? 'multipart/form-data'
          : 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    serverResponse.status = true;
    serverResponse.data = (await data?.data) ?? data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const requestOtp = error?.response?.data?.errors?.verification_required
        ? true
        : false;
      if (error?.response?.status == 422 && requestOtp) {
        serverResponse.status = true;
        serverResponse.message = error?.response?.data?.message ?? 'API ERROR';
      } else {
        serverResponse.message = error?.response?.data?.message ?? 'API ERROR';
      }
    } else {
      serverResponse.error = error;
    }
  }
  return serverResponse;
};

export const useData = (endpoint, params, token, changeMethod, onMultiPart) =>
  useQuery(['data', endpoint, params, token, changeMethod, onMultiPart], () =>
    fetchData(endpoint, params, token, changeMethod, onMultiPart),
  );

export const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

let isPickingImage = false;

export const getImage = async (
  setValue,
  stateName,
  setVisible,
  normalState,
) => {
  if (isPickingImage) return; // Prevent multiple invocations
  isPickingImage = true;
  try {
    const image = await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      multiple: false,
      mediaType: 'photo',
      compressImageQuality: 1.0,
    });
    if (normalState) {
      setValue(image);
    } else {
      setValue(stateName, image, {
        shouldValidate: true,
      });
    }
    if (setVisible) {
      setVisible(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isPickingImage = false; // Reset flag
  }
};

export const getImageWithCamera = async (
  setValue,
  stateName,
  setVisible,
  normalState,
) => {
  try {
    const image = await ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      multiple: false,
      mediaType: 'photo',
      compressImageQuality: 1.0,
    });
    if (normalState) {
      setValue(image);
    } else {
      setValue(stateName, image, {
        shouldValidate: true,
      });
    }
    if (setVisible) {
      setVisible(false);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const _pickDocument = async (
//   setPdf,
//   stateName,
//   toast,
//   setModal,
//   apiCall,
// ) => {
//   try {
//     const result = await pickSingle({
//       copyTo: 'cachesDirectory',
//       allowMultiSelection: true,
//       mode: 'import',
//       type: [types.images, types.doc, types.pdf],
//     });
//     const fileUri = result?.fileCopyUri;
//     if (!fileUri) {
//       console.log('File URI is undefined or null');
//       return;
//     }
//     if (result?.size > 5000000) {
//       return renderToast(toast, 'The maximum allowed file is 5MB');
//     }
//     setPdf(stateName, result);
//     if (apiCall) {
//       apiCall(...result);
//     }

//     if (setModal) {
//       setModal(false);
//     }
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       console.log('User cancelled file picker');
//     } else {
//       console.log('DocumentPicker err => ', err);
//     }
//   }
// };

export const endpoints = {
  Get_Banner: 'get-hero-banners',
  GET_TRENDING_ADVENTURES: 'trending-adventures',
  GET_UPCOMING_ADVENTURES: 'homepage-upcoming-adventures',

  KNOW_MORE_ADVENTURE: 'know-more-about-adventure',
  GET_HOMEPAGE_VENDORS: 'fetch-homepage-vendors',

  VIEW_ADVENTURE_PACKAGES: 'view-adventure-packages',

  GET_ADVENTURE_COURSES: 'get-adventure-courses',
  GET_BLOGS: 'get-blogs',
  GET_PROFILE: 'user-profile',
  UPDATE_PROFILE: 'update-user-details',


  USER_REGISTER: 'auth/user-register',
  USER_LOGIN: 'auth/user-login',
  GOOGLE_LOGIN: 'auth/google-login',
  VALIDATE_USER: 'auth/validate-user',

  INITIATE_PAYMENT: 'initiate-payment',
  VERIFY_PAYMENT: 'verify-payment', // 👈 clean
  CREATE_BOOKING: 'adventure-bookings',

  CREATE_BOOKING: 'adventure-bookings',
  GET_USER_BOOKINGS: 'user-bookings',
  GET_SINGLE_BOOKING: 'user-bookings/:orderId',
  SYNC_CASHFREE_ORDER: 'sync-cashfree-order',
  PASSWORD_UPDATE:"reset-password",
  GET_SUB_CATEGORY_ADVENTUERS:"get-subcategory-adventures",
  GET_ALL_PACKAGE_DETAILS:"view-adventure-packages"
};

export const endpointWithId = id => {
  return {
    GET_ADVENTURE_DETAILS: `trending/adventure-details/${id}`,
    GET_VENDOR_PACKAGES: `fetch-vendor-packages/${id}`,
    ADVENTURES_BY_CATEGORY: `adventures-by-category/${id}`,
  };
};

export const timeFormatter = (cell, changeFormate) => {
  if (cell !== null || cell !== undefined) {
    let correctDate = moment(new Date(cell)).format(
      changeFormate ?? 'DD-MM-YYYY',
    );
    return correctDate;
  } else {
    return 'NA';
  }
};

export const formatDateDynamic = (date, format = 'DD-MM-YYYY') => {
  if (!date) return 'NA';

  // If it's already a string like "01-10-2025", convert it safely
  const parsedDate = moment(date, [
    moment.ISO_8601,
    'DD-MM-YYYY',
    'YYYY-MM-DD',
    'MM-DD-YYYY',
  ]);

  if (!parsedDate.isValid()) return 'Invalid Date';

  return parsedDate.format(format);
};

export const onChangeDate = (
  selectedDate,
  setShow,
  stateName,
  setValue,
  yearMonth,
  time,
  refetch,
) => {
  setShow(false);
  const formatChange = timeFormatter(
    selectedDate,
    time === 'time' ? 'hh:mm A' : yearMonth ? 'DD-MM-YYYY' : 'YYYY-MM-DD',
  );

  setValue(stateName, formatChange, { shouldValidate: true });
  if (refetch) {
    refetch();
  }
};

export const numberFormat = value => {
  const numberFormatter = new Intl.NumberFormat();
  const newValue = numberFormatter.format(value);
  return newValue;
};

const sharePdf = async (imgPath, toast) => {
  try {
    const options = {
      url: imgPath,
      type: 'images/jpeg',
    };
    await Share.open(options);
    renderToast(toast, 'Scanner downloaded successfully', 'success');
  } catch (error) {
    console.log('Error sharing PDF:', error);
  }
};

export const googleLoginApi = async (idToken) => {
  try {
    const { data } = await axios.post(
      apiURL('auth/google-login'),
      {
        token: idToken, // 👈 ONLY this
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ??
        error?.message ??
        'Google login failed',
    };
  }
};


// export const actualDownload = (url, toast, title, type) => {
//   const name = url?.split('/').pop();
//   const extension = name?.split('.').pop()?.split(/\#|\?/)[0] || 'png';

//   const {dirs} = ReactNativeBlobUtil.fs;
//   const dirToSave =
//     Platform.OS === 'ios' ? dirs.DocumentDir : dirs.LegacyDownloadDir;

//   const fileName =
//     title === 'Quotation'
//       ? `${title}.pdf`
//       : title === 'resume'
//       ? name
//       : `${title}.${extension}`;

//   const filePath = `${dirToSave}/${fileName}`;

//   const configFb = {
//     fileCache: true,
//     addAndroidDownloads: {
//       useDownloadManager: true,
//       notification: true,
//       mediaScannable: true,
//       title: title === 'Quotation' ? 'Quotation download' : fileName,
//       path: filePath,
//     },
//   };

//   const configOptions = Platform.select({
//     ios: {
//       fileCache: configFb.fileCache,
//       title: configFb.addAndroidDownloads.title,
//       path: configFb.addAndroidDownloads.path,
//       appendExt: extension,
//     },
//     android: configFb,
//   });

//   ReactNativeBlobUtil.config(configOptions)
//     .fetch('GET', url)
//     .then(res => {
//       const filePath = res.path();

//       if (Platform.OS === 'ios') {
//         sharePdf(filePath, toast);
//       } else {
//         if (title === 'Quotation') {
//           renderToast(toast, 'Quotation downloaded successfully', 'success');
//         } else if (type) {
//           renderToast(
//             toast,
//             `${title === 'resume' ? 'Resume' : title} downloaded successfully`,
//             'success',
//           );
//         } else {
//           renderToast(toast, 'Scanner downloaded successfully', 'success');
//         }
//       }
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };

// export const downloadFile = async (url, toast, title) => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       actualDownload(url, toast, title);
//     } else {
//       Alert.alert(
//         'Permission Denied!',
//         'You need to give storage permission to download the file',
//       );
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

export function getSimpleInitials(fullName) {
  const nameParts = fullName?.toString().split(' ');
  // Get the first letter of the first part and the first letter of the last part
  const initials =
    nameParts?.length > 1
      ? nameParts[0][0] + nameParts[nameParts?.length - 1][0]
      : fullName[1] == undefined
        ? fullName[0]
        : nameParts[0][0] + nameParts[nameParts?.length - 1][1]; // Fallback to just the first character of fullName if it's a single word
  return initials == undefined ? 'UN' : initials?.toUpperCase();
}

export function generateRandomColor() {
  // to ensure the colors are lighter
  const red = Math.floor(Math.random() * (256 - 180) + 180); // Red component
  const green = Math.floor(Math.random() * (256 - 180) + 180); // Green component
  const blue = Math.floor(Math.random() * (256 - 180) + 180); // Blue component

  // Convert each component to a hexadecimal string and concatenate them
  const color =
    '#' +
    red.toString(16).padStart(2, '0') +
    green.toString(16).padStart(2, '0') +
    blue.toString(16).padStart(2, '0');

  return color;
}

export const onSearch = (text, restData, key, setFilterData, setSearch) => {
  const dd = /^[a-zA-Z0-9\s]*$/;
  if (dd.test(text)) {
    const searchData = restData?.filter(item => {
      const itemData = item[key] ? item[key]?.toLowerCase() : ''.toUpperCase();

      const textData = text.toLowerCase();
      return itemData.search(textData) > -1;
    });
    setFilterData(searchData?.length > 0 ? searchData : 'No Data');
    setSearch(text);
  } else {
    setFilterData('');
    setSearch(text);
  }
};

export const convertToTitleCase = str => {
  return str
    .split('_')
    .filter(word => word.toLowerCase() !== 'id')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const validateNumber = number => {
  const checkNumber = /^[0-9\s]*$/.test(number);
  return checkNumber;
};

export const validateEmail = email => {
  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email?.trim(),
  );
  return checkEmail;
};

export const ControlledTooltip = props => {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

export const requestNotificationPermission = async updateDeviceToken => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      requestUserPermission(updateDeviceToken);
    } catch (err) {
      console.log(err);
    }
  } else {
    requestUserPermission(updateDeviceToken);
  }
};

function getDate18YearsAgo() {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today?.getFullYear() - 18,
    today?.getMonth(),
    today?.getDate(),
  );
  return eighteenYearsAgo;
}
export const date18YearsAgo = getDate18YearsAgo();

export const formatTime = dateString => {
  const date = moment(dateString);
  const now = moment();

  const diffInSeconds = now.diff(date, 'seconds');
  const diffInMinutes = now.diff(date, 'minutes');
  const diffInHours = now.diff(date, 'hours');

  if (diffInSeconds < 60) {
    // Less than 1 minute ago
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    // Less than 1 hour ago
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 24 && diffInMinutes >= 60) {
    // Less than 24 hours ago
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (now.diff(date, 'days') === 1) {
    // Yesterday
    return `Yesterday at ${date.format('hh:mm A')}`;
  } else {
    // Older dates
    return date.format('MMM D, YYYY [at] hh:mm A');
  }
};

export const sendGpsActivity = async (token, status) => {
  const response = await httpRequestPost(
    endpoints?.SEND_GPS_ACTIVITY,
    { gps_status: status },
    token,
  );
};

// const getOneTimeLocation = token => {
//   Geolocation.getCurrentPosition(
//     //Will give you the current location
//     position => {
//       if (Platform.OS === 'android' && Platform.Version > 28) {
//         requestPermissions(token);
//       }
//       sendGpsActivity(token, 'ON');
//     },
//     error => {
//       if (Platform.OS === 'ios') {
//         requestIOSPermission(token);
//       }
//       if (Platform.OS === 'android' && Platform.Version > 28) {
//         requestPermissions(token);
//       }
//       sendGpsActivity(token, 'OFF');
//     },
//     {
//       enableHighAccuracy: false,
//       timeout: 3000,
//     },
//   );
// };

// const requestPermissions = async token => {
//   try {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//     ]);
//     if (
//       granted['android.permission.ACCESS_FINE_LOCATION'] ===
//         PermissionsAndroid.RESULTS.GRANTED &&
//       granted['android.permission.ACCESS_BACKGROUND_LOCATION'] ===
//         PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       // getOneTimeLocation(token);
//     } else {
//       showPermissionAlert();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const requestIOSPermission = async token => {
//   const permission = PERMISSIONS.IOS.LOCATION_ALWAYS;
//   const permissionStatus = await check(permission);

//   if (permissionStatus === RESULTS.GRANTED) {
//     getOneTimeLocation(token);
//   } else {
//     showPermissionAlert();
//   }
// };

// const showPermissionAlert = () => {
//   Alert.alert(
//     'Location Permission Required',
//     `Please allow ${
//       Platform.OS === 'ios' ? 'always' : 'all the time'
//     } location access in app settings.`,
//     [{text: 'Open Settings', onPress: () => Linking.openSettings()}],
//     {cancelable: false},
//   );
// };

// export const requestLocationPermission = async (token, custom) => {
//   if (Platform.OS === 'android') {
//     await promptForEnableLocationIfNeeded({
//       interval: 1000,
//       fastInterval: 1000,
//     })
//       .then(() => {
//         if (custom) {
//           custom();
//         } else {
//           getOneTimeLocation(token);
//         }
//       })
//       .catch(() => {
//         sendGpsActivity(token, 'OFF');
//       });
//   } else {
//     getOneTimeLocation(token);
//   }
// };

// export const sendAppActivity = async (status, data) => {
//   const response = await httpRequestPost(
//     endpoints?.SEND_APP_ACTIVITY,
//     {status: status},
//     data?.token,
//   );
// };
export const capitalizeWords = name => {
  return name
    ?.split(' ')
    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(' ');
};

export const convertToTree = data => {
  const idMap = {};
  const coupleMap = new Map();

  // 1. sabko init karo
  data.forEach(person => {
    idMap[person.id] = {
      ...person,
      children: [],
      couple: null,
      isCouple: false,
    };
  });

  // 2. Couples bana ke ek hi pair node banao
  data.forEach(person => {
    person.relations.forEach(rel => {
      if (rel.relation === 'husband' || rel.relation === 'wife') {
        const partnerId = rel.id;
        const pairKey = [person.id, partnerId].sort().join('-');

        if (!coupleMap.has(pairKey)) {
          const p1 = idMap[person.id];
          const p2 = idMap[partnerId];
          const pairNode = {
            id: pairKey,
            couple: [
              {
                name: p1.name,
                profile_image: p1.profile_image,
                gender: p1.gender,
                hindi_name: p1.hindi_name,
              },
              {
                name: p2.name,
                profile_image: p2.profile_image,
                gender: p2.gender,
                hindi_name: p2.hindi_name,
              },
            ],
            children: [],
            isCouple: true,
          };

          coupleMap.set(pairKey, pairNode);

          p1._pair = pairNode;
          p2._pair = pairNode;
        }
      }
    });
  });

  // 3. child ko parent ke pair mein link karo
  data.forEach(person => {
    person.relations.forEach(rel => {
      if (rel.relation === 'father' || rel.relation === 'mother') {
        const parent = idMap[rel.id];
        const parentNode = parent._pair || parent;

        const child = idMap[person.id];
        const pairs = [];

        // 1. Agar is bande ka koi pair bana toh use lo
        if (child._pair) pairs.push(child._pair);

        // 2. Agar uske multiple pairs hain, woh bhi lo
        coupleMap.forEach(pair => {
          if (pair.couple.includes(child.name) && !pairs.includes(pair)) {
            pairs.push(pair);
          }
        });

        // 3. Agar koi pair nahi mila, toh single banda hi daalo
        if (pairs.length === 0) pairs.push(child);

        pairs.forEach(p => {
          if (!parentNode.children.includes(p)) {
            parentNode.children.push(p);
          }
        });
      }
    });
  });

  // 4. Roots pakdo (jo kabhi child nahi bane)
  const allNodes = new Set(Object.values(idMap).map(p => p._pair || p));
  const childNodes = new Set();
  allNodes.forEach(node => {
    if (node.children) {
      node.children.forEach(child => childNodes.add(child));
    }
  });

  const roots = Array.from(allNodes).filter(n => !childNodes.has(n));
  if (roots.length === 1) return roots[0];
  return { name: 'Family Tree', children: roots };
};

// utils/prepareMatrimonialStatus.ts

// utils/matrimonial.ts
export const prepareMatrimonialStatus = dob => {
  if (!dob) return { status: 'Inactive', showCheckbox: false };

  // 🔹 Ensure correct parsing
  const [day, month, year] = typeof dob === 'string' ? dob.split('-') : [];
  const birthDate =
    typeof dob === 'string'
      ? new Date(Number(year), Number(month) - 1, Number(day))
      : new Date(dob);

  if (isNaN(birthDate.getTime())) {
    console.error('Invalid DOB format. Use DD-MM-YYYY or Date object.');
    return { status: 'Inactive', showCheckbox: false };
  }

  const today = new Date();

  // ✅ Correct age calculation
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const status = age >= 18 ? 'Active' : 'Inactive';
  const showCheckbox = age >= 18;

  console.log(
    `DOB: ${dob}, Calculated Age: ${age}, Status: ${status}, Today: ${today.toLocaleDateString()}`,
  );

  return { status, showCheckbox };
};

export const initiatePayment = async (payload, token) => {
  try {
    const url = apiURL(endpoints.INITIATE_PAYMENT);

    console.log("➡️ INITIATE PAYMENT URL:", url);
    console.log("➡️ PAYLOAD:", JSON.stringify(payload, null, 2));

    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.data?.payment_session_id || !res.data?.order_id) {
      throw new Error("Invalid payment response from server");
    }

    return res.data;
  } catch (err) {
    throw new Error(err.message || "Payment initiation failed");
  }
};


export const verifyCashfreePayment = async (orderId, token) => {
  return getData(
    apiURL(`${endpoints.VERIFY_PAYMENT}/${orderId}`),
    {},
    token
  );
};


export const createAdventureBooking = async (payload, token) => {
  return postData(
    apiURL(endpoints.CREATE_BOOKING),
    payload,
    token,
    false
  );
};

