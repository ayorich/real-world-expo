import { createTheme } from '@rneui/themed';

import { darkColors } from './colors';

export const darkTheme = createTheme({
  components: {
    Button: {
      activeOpacity: 0.8,
      buttonStyle: {
        backgroundColor: darkColors.primaryColor,
        borderRadius: 6,
      },
      disabledStyle: {
        backgroundColor: darkColors.primaryColor,
        opacity: 0.5,
      },
    },
    Text: {
      style: {
        color: darkColors.textPrimary,
      },
    },
    Slider: {
      maximumTrackTintColor: darkColors.borderColor,
      minimumTrackTintColor: darkColors.primaryColorLight,
      thumbTintColor: darkColors.primaryColor,
    },
  },
});
