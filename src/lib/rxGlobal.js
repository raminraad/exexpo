import { StyleSheet } from "react-native";

export const globalColors = {
  palette: {
    seaGreen: "#2a9d8f",
    paleGray: "#e5e5e5",
    glassyWhite: "rgba(255,255,255,0.7)",
    cream: "#F1FAEE",
    coal: "#111111",
    dirtyNavy: "#1c313a",
    dimBlue: "#0582ca",
  },
  gradients: {
    listItem: {
      colors: ["#e9ecef", "#f8f9fa"],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
  btnAdd: "#06d6a0",
  btnDelete: "#e55934",
  btnUpdate: "#3DA5D9",
  btnOk: "#5e60ce",
  btnCancel: "#979DAC",
  drawerBackground: "#2f3e46",
  drawerIcon: "#F1FAEE66",
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
  inputBorder: "#ddd",
  homeSectionHeader: "#F1FAEE66",
  loginScreenContainerBackground: "#4b3f72",
  loginScreenInputBackground: "#1f204165",
  loginScreenSubmitButtonBackground: "#10002b88",
  listItemNavigateIconUndone: "#00C49A",
  listItemNavigateIconDone: "#8d99ae",
  listItemCollapseIcon: "#8d99ae55",
  listItemExpandIcon: "#8d99ae55",
  listItemHeaderContainer: "#f1f5f7",
  listItemContentContainer: "#8da9c422",
  listItemContentBorder: "#8da9c488",
  listItemTitleText: "#6c757d",
  listItemSubtitleText: "#6c757dAA",
  listItemSubtitleIcon: "#3a6ea588",
  addModalFieldValidationErrorText: "#e71d36",
  screenContainer: "#f8f9fa",
  transparent: "#FFFFFF00",
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
  buttonGroupButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 10,
    height: 45,
    borderRadius: 5,
  },

  drawerContainer: {
    flex: 1,
    backgroundColor: globalColors.drawerBackground,
  },
  emptyList: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: globalColors.listItemContentBorder,
    paddingVertical: 30,
    paddingHorizontal: 10,
    flexDirection: "row-reverse",
  },
  titleText: {
    textAlign: "right",
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
  },
  input: {
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
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
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: globalColors.listItemHeaderContainer,
    paddingVertical: 5,
  },
  listItemHeaderNavigateButton: { paddingLeft: 5, paddingRight: 10 },
  listItemHeaderCollapseIcon: { paddingRight: 5 },
  listItemHeaderInnerTextContainer: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  listItemHeaderFieldContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    marginLeft: 10,
  },
  listItemHeaderFieldTitle: {
    textAlignVertical: "center",
    fontSize: 14,
    color: "grey",
  },
  listItemHeaderFieldData: {
    textAlignVertical: "center",
    marginRight: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  listItemHeaderContainer: {
    borderRadius: 15,
    marginTop: 6,
    marginHorizontal: 15,
  },
  listItemContentContainer: {
    paddingRight: 40,
    paddingVertical: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    borderRadius: 15,
    alignItems: "flex-end",
    backgroundColor: globalColors.listItemContentContainer,
    borderColor: globalColors.listItemContentBorder,
    borderWidth: 1,
    borderTopWidth: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  listItemContentRow: {
    flexDirection: "row-reverse",
    paddingVertical: 5,
  },
  listItemContentFieldTitle: {
    textAlignVertical: "center",
    fontSize: 14,
    color: "grey",
  },
  listItemContentFieldData: {
    textAlignVertical: "center",
    marginRight: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  listItemSwipeLeftContainer: {
    justifyContent:'flex-end',
    alignItems: "center",
    flexDirection: "row",
    marginLeft:30,
  },
  listItemTitle: {
    color: globalColors.listItemTitleText,
    fontWeight: "bold",
  },
  shadowedContainer: {
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  addModalContainer: {
    padding: 50,
  },
  addModalFieldContainer: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  addModalFieldTitle: {
    flex: 1,
    textAlign: "right",
    alignSelf: "flex-end",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#ABC",
  },
  addModalFieldInput: {
    borderWidth: 1,
    alignSelf: "stretch",
    borderColor: globalColors.inputBorder,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginRight: 20,
    textAlign: "right",
  },
  addModalFieldValidationError: {
    textAlign: "right",
    color: globalColors.addModalFieldValidationErrorText,
    marginRight: 20,
  },
  addModalFieldRadioButtonGroupContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  radioItemContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    activeOpacity: 70,
  },
  optionText: {
    fontSize: 16,
  },
};

export const globalLiterals = {
  ButtonTexts: {
    yes: "بلی",
    no: "خیر",
    ok: "تأیید",
    cancel: "انصراف",
  },
  Titles: {
    syncData: "بروزرسانی داده ها",
  },
  Messages: {
    emptyList: "آیتمی برای نمایش وجود ندارد",
  },
  validationErrors: {
    required: "وارد کردن این فیلد الزامیست",
    notNumber: "مقدار این فیلد میبایست عددی باشد",
    notInGeoRange: "فاصله شما از مقدار تعیین شده بیشتر است. لطفاً به محدوده فروشگاه مورد نظر برگشته و مجددا تلاش فرمایید.",
  },
  actionAndStateErrors: {
    saveError: "ذخیره اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش نمایید",
    NoInternetError: "اتصال به اینترنت برقرار نیست",
  },
  Confirmations: {
    syncData: "ارسال و بروزرسانی داده ها انجام شود؟",
    deleteProduct: "کالای انتخاب شده حذف شود؟",
  },
  alerts: {
    syncDone: "ارسال و بروزرسانی داده ها با موفقیت انجام شد.",
  },
};
