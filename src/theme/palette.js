// theme vars
import mainTheme from '../assets/scss/_themes-vars.module.scss'

const colors = mainTheme

const defaultPalette = {
  colorPrimary: colors.primaryMain,
  colorPrimaryLight: colors.primaryLight,
  colorPrimaryDark: colors.primaryDark,
  colorSuccess: colors.successMain,
  colorSuccessLight: colors.successLight,
  colorSuccessDark: colors.successDark,
  colorWarning: colors.warningMain,
  colorWarningLight: colors.warningLight,
  colorWarningDark: colors.warningDark,
  colorError: colors.errorMain,
  colorErrorLight: colors.errorLight,
  colorErrorDark: colors.errorDark,
  grey50: colors.grey50,
  grey100: colors.grey100,
  grey200: colors.grey200,
  grey300: colors.grey300,
  grey400: colors.grey400,
  grey500: colors.grey500,
  grey600: colors.grey600,
  grey700: colors.grey700,
  grey900: colors.grey900,
  skeleton: colors.skeleton,
  colorLink: '',
  colorTextBase: '',
  colorBgBase: colors.background,
  colorPaper: colors.paper,
  fontFamily: "'Dosis', sans-serif",
  fontWeight: 400,
  fontSize: 15,
  borderRadius: 4
}

export { defaultPalette }
