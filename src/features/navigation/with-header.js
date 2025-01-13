import { Stack } from 'expo-router';

export const withHeader = options => Component =>
  function WithHeader(props) {
    return (
      <>
        <Stack.Screen
          options={{
            headerTintColor: '#fff',
            ...options,
          }}
        />
        <Component {...props} />
      </>
    );
  };
