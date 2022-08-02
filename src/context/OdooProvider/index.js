import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {login} from './helpers';
import {useNavigation} from '@react-navigation/native';
import AuthLoadingScreen from '../../components/auth';
import {Alert} from 'react-native';
import CookieManager from '@react-native-cookies/cookies';

const OdooContext = React.createContext({});

export default function OdooProvider({children}) {
  const [session, setSession] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigation = useNavigation();

  React.useEffect(() => {
    const bootstrap = async () => {
      try {
        const connection = await AsyncStorage.getItem('connection');

        if (connection) {
          setSession(JSON.parse(connection));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  const signIn = React.useCallback(
    async ({server, username, password}) => {
      try {
        const connection = await login({server, username, password});
        if (connection) {
          setSession(connection);
          navigation.navigate('Home', {url: connection.backend_url});
        }
      } catch (error) {
        Alert.alert('An unknown error occurred', error.message);
        console.error(error);
      }
    },
    [navigation],
  );

  const signOut = React.useCallback(() => {
    setSession(null);
  }, []);

  const values = React.useMemo(() => {
    return {
      session,
      signIn,
      signOut,
    };
  }, [session, signIn, signOut]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return <OdooContext.Provider value={values}>{children}</OdooContext.Provider>;
}

export const useOdooContext = () => {
  const context = React.useContext(OdooContext);
  if (context === undefined) {
    throw new Error('useOdooContext must be used within a OdooProvider');
  }
  return context;
};
