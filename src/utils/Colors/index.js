const mainColors = {
  blues: "#387BBF", //birubaru
  primary_blues: "#49A0ED", //primaryblue
  dark: "#00195E", //birubold
  light: "#DDF4FD",
  grey: "#504D54", //tulisan
  grey1: "#E0E0E0", //abuinput,
  grey2: "#BDBDBD",
  grey3: "#828282",
  grey4: "#F2F2F2", //paling muda
  white1: "#FDFDFD",
  white2: "#FFFFFF",
  black1: "#000000",
  black2: "rgba(0,0,0,0.3)",
  red1: "#E06379",
};

export const colors = {
  primary: mainColors.blues,
  secondary: mainColors.dark,
  primaryBlue: mainColors.primary_blues,
  primaryWhite: mainColors.white1,
  primaryGrey: mainColors.grey3,
  secondaryGrey: mainColors.grey4,
  secondaryWhite: mainColors.white2,
  lighBlue: mainColors.light,

  text: {
    title: mainColors.white1,
    subTitle: mainColors.dark,
    info: mainColors.grey3,
    primary: mainColors.primary_blues,
    secondary: mainColors.grey,
    active: mainColors.blues,
    inactive: mainColors.grey2,
  },
  input: {
    primary: mainColors.grey1,
    secondary: mainColors.white1,
  },
  button: {
    primary: {
      background: mainColors.primary_blues,
      text: "white",
    },
    secondary: {
      background: "white",
      text: mainColors.blues,
    },
  },
  loadingBackground: mainColors.black2,
  error: mainColors.red1,
};
