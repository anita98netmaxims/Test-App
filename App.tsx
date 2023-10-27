import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeDetailScreen from './src/screens/HomeDetailScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            title: 'Detail Screen',
          }}
          name="HomeDetail"
          component={HomeDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
