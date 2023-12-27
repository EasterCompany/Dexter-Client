import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20202999"
  },

  logo: {
    width: 164,
    height: 164,
    marginBottom: 32
  },

  header1: {
    width: "100%",
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Metro-Bold",
    fontSize: 32
  },

  header2: {
    width: "100%",
    textAlign: "center",
    color: "#EEEEEE",
    fontFamily: "Metro",
    fontSize: 28
  },

  header3: {
    width: "100%",
    textAlign: "center",
    color: "#DDDDDD",
    fontFamily: "Metro-Thin",
    fontSize: 24
  },

  loginButtonContainer: {
    width: 200,
    height: 48,
    marginBottom: 16
  },

  loginButtonText: {
    width: "100%",
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Metro-Thin",
    fontSize: 18
  },

  loginMessage: {
    width: "100%",
    textAlign: "center",
    color: "#CCCCCC",
    fontFamily: "Metro-Thin",
    fontSize: 16,
    paddingBottom: 32
  }
});
