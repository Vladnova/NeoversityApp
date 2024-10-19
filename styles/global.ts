import {Dimensions, TextStyle} from "react-native";


const {width} = Dimensions.get("window");

export const colors = {
    white: "#ffffff",
    blackPrimary: "#212121",
    lightGrey: "#F6F6F6",
    borderGray: "#E8E8E8",
    darkBlue: "#1B4371",
    orange: "#FF6C00"
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

