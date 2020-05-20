import { StyleSheet } from "react-native";


export const globalColors = {
  palette: {
    seaGreen: "#2a9d8f",
    paleGray: "#e5e5e5",
    cream: "#F1FAEE",
    coal: "#111111",
    dirtyNavy: "#1c313a",
    dimBlue: "#0582ca",
  },
  btnAdd: "#00C49A",
  btnDelete: "#e55934",
  btnUpdate: "#3DA5D9",
  btnOk: "#3DA5D9",
  btnCancel: "#979DAC",
  drawerBackground: "#0f4c5c",
  drawerIcon: "#98c1d9",
  homeBackground: "#292f36",
  homeIconBackground1: "#7768ae",
  homeIconBackground2: "#ec9a29",
  homeIconBackground3: "#3bb273",
  homeIconBackground4: "#43aa8b",
  homeIconBackground5: "#577590",
  headerIcon: "#F1FAEE",
  footerIcon: "#F1FAEE",
  searchBarIcon: "#666",
  homeIcon: "#F1FAEE",
  homeIconText: "#F1FAEE",
  homeSectionHeader: "#F1FAEE66",
  loginPageBackground: "#2e5266",
  listItemNavigateIcon: "#6b717e",
  listItemCollapseIcon: "#8d99ae",
  listItemExpandIcon: "#8d99ae",
  listItemHeaderContainer: "#f1f5f7",
  listItemContentContainer: "#FFFFFF",
};

export const globalSizes = {
  icons: {
    small: 16,
    medium: 24,
    large: 32,
    xLarge: 48,
  },
  headerIcon: 24,
  footerIcon: 24,
  searchBarIcon: 24,
};

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 15,
  },
  CircleShapeView: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  OvalShapeView: {
    marginTop: 20,
    width: 100,
    height: 100,
    backgroundColor: "#00BCD4",
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
  },
  listItemHeaderContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 5,
    backgroundColor: globalColors.listItemHeaderContainer,
  },
  listItemHeaderInnerText: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  listItemHeaderFieldTitle: {
    textAlignVertical: "center",
    marginRight: 25,
    fontSize: 14,
    color: "grey",
  },
  listItemHeaderFieldData: {
    textAlignVertical: "center",
    marginRight: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  listItemContentContainer: {
    flexDirection: "row-reverse",
    height: 60,
    paddingHorizontal: 60,
    paddingVertical: 10,
    alignItems: "flex-start",
    backgroundColor: globalColors.listItemContentContainer,
  },
  listItemContentFieldTitle: {
    textAlignVertical: "center",
    fontSize: 14,
    color: "grey",
  },
  listItemContentFieldData: {
    textAlignVertical: "center",
    marginRight: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  listItemSwipeLeftContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
});

export const menuOptionsCustomStyles = {
  optionsContainer: {
    width: 300,
    padding: 5,
    borderRadius: 5,
  },
  optionsWrapper: {},
  optionWrapper: {
    height: 50,
    justifyContent: "center",
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70,
  },
  optionText: {
    fontSize: 16,
  },
};

