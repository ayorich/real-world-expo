import { useLocalSearchParams } from 'expo-router';

export const withLocalSearchParams = Component =>
  function WithLocalSearchParams(props) {
    const parameters = useLocalSearchParams();

    return <Component {...props} {...parameters} />;
  };
