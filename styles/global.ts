import {Dimensions, TextStyle} from "react-native";


const {width} = Dimensions.get("window");

export const colors = {
    white: "#ffffff",
    blackPrimary: "#212121",
    lightGrey: "#F6F6F6",
    borderGray: "#E8E8E8",
    darkBlue: "#1B4371",
    orange: "#FF6C00",
    gray: "#BDBDBD"
}

export const baseTypography: TextStyle = {
    textAlign: "center",
    letterSpacing: 0.3,
}

export const title: TextStyle = {
    marginBottom: 32,
    color: colors.blackPrimary,
    fontSize: 30,
    fontWeight: "500",
}

export const backgroundOrange: TextStyle = {
    backgroundColor: colors.orange,
}

export const primaryBtn: TextStyle = {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
}

export const container: TextStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
}

export const registrationAndLoginContainer: TextStyle = {
    paddingHorizontal: 16,
    width: width,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
}

export const secondaryText: TextStyle = {
    fontSize: 16,
    fontWeight: "400",
    color: colors.darkBlue,
}

export const innerWrapper: TextStyle = {
    gap: 16,
}

export const wrapInputMarginBottom: TextStyle = {
    marginBottom: 43
}


export const passwordBtn: TextStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
}

export const wrapperAvatar: TextStyle = {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 16,
    left: "50%",
    top: -60,
    marginLeft: 15,
    transform: [{ translateX: -60 }],
}

export const plusContainer: TextStyle = {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    right: -15,
    bottom: 15
}

export const plusSign: TextStyle = {
    position: "absolute",
    fontSize: 40,
    fontWeight: '200',
    color: colors.orange,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -27 }],
}

