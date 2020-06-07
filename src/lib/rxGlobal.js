import { StyleSheet } from "react-native";

export const globalColors = {
  palette: {
    seaGreen: "#2a9d8f",
    paleGray: "#e5e5e5",
    glassyWhite:'rgba(255,255,255,0.7)',
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
  btnAdd: "#00C49A",
  btnDelete: "#e55934",
  btnUpdate: "#3DA5D9",
  btnOk: "#3DA5D9",
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
  listItemContentContainer: "#FFFFFF",
  listItemSwipeLeftContainer: "#e6e6eaaa",
  listItemTitle: "#6c757d",
  addModalFieldValidationErrorText: "#e71d36",
  screenContainer: "#f8f9fa",
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
  drawerContainer: {
    flex: 1,
    backgroundColor: globalColors.drawerBackground,
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
    padding: 40,
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
  listItemContainer: {
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal: 15,
  },
  listItemContentContainer: {
    paddingRight: 40,
    paddingVertical: 10,
    alignItems: "flex-end",
    backgroundColor: globalColors.listItemContentContainer,
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
    backgroundColor: globalColors.listItemSwipeLeftContainer,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  listItemTitle: {
    color: globalColors.listItemTitle,
    fontWeight: "bold",
  },
  shadowedContainer: {
    borderRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
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
