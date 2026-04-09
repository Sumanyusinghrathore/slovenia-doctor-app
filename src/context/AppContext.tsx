import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ---------------- NAVIGATION STATES ---------------- */

export const navigationStateType = {
  WELCOME: 'WELCOME',
  HOME: 'HOME',
  AUTH: 'AUTH',
  LOADING: 'LOADING',
} as const;

type NavigationStateType =
  (typeof navigationStateType)[keyof typeof navigationStateType];

/* ---------------- TYPES ---------------- */

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  role?: 'admin' | 'doctor' | 'compounder' | 'patient';
}

interface AppContextType {
  userData: UserData | null;
  navigationState: NavigationStateType;
  setNavigationState: React.Dispatch<React.SetStateAction<NavigationStateType>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  configuration: string;
  updateConfiguration: React.Dispatch<React.SetStateAction<string>>;
}

/* ---------------- CONTEXT ---------------- */

const App = createContext<AppContextType | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

/* ---------------- PROVIDER ---------------- */

const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const [navigationState, setNavigationState] =
    useState<NavigationStateType>(navigationStateType.LOADING);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [configuration, updateConfiguration] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState(false);

  /* ---------- APP START : LOAD USER ---------- */
  useEffect(() => {
    const hydrateApp = async () => {
      try {
        const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        const storedUser = await AsyncStorage.getItem('userData');

        if (!hasSeenWelcome) {
          await AsyncStorage.setItem('hasSeenWelcome', 'true');
        }

        if (storedUser) {
          const parsed: UserData = JSON.parse(storedUser);

          if (
            parsed?.token &&
            parsed?.role &&
            ['admin', 'doctor', 'compounder', 'patient'].includes(parsed.role)
          ) {
            setUserData(parsed);
            setNavigationState(navigationStateType.HOME);
            return;
          }

          await AsyncStorage.removeItem('userData');
        }

        setNavigationState(navigationStateType.AUTH);
      } catch (error) {
        console.log('Hydration error:', error);
        setNavigationState(navigationStateType.AUTH);
      } finally {
        setIsHydrated(true);
      }
    };

    hydrateApp();
  }, []);


  /* ---------- SYNC USERDATA → STORAGE ---------- */
  useEffect(() => {
    if (!isHydrated) return;

    const syncUser = async () => {
      try {
        if (userData?.token) {
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(userData),
          );
        } else {
          await AsyncStorage.removeItem('userData');
        }
      } catch (error) {
        console.log('Storage sync error:', error);
      }
    };

    syncUser();
  }, [userData, isHydrated]);

  /* ---------- CONTEXT VALUE ---------- */
  const value: AppContextType = {
    userData,
    navigationState,
    setNavigationState,
    setUserData,
    configuration,
    updateConfiguration,
  };

  return <App.Provider value={value}>{children}</App.Provider>;
};

/* ---------------- HOOK ---------------- */

export const useApp = (): AppContextType => {
  const context = useContext(App);
  if (!context) {
    throw new Error('useApp must be used within AppContext');
  }
  return context;
};

export default AppContext;
