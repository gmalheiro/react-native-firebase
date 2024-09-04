import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegistrationScreen } from '@/src/screens';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer
    independent={true}>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {(props: any) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}