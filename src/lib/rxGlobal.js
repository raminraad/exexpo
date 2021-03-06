import { StyleSheet } from "react-native";

export const setting = {
  toastDurationDefault:4000,
}

export const globalColors = {
  palette: {
    seaGreen: "#00a896",
    paleGray: "#e5e5e5",
    glassyWhite: "rgba(255,255,255,0.7)",
    cream: "#F1FAEE",
    lead:'#8d99ae',
    mercury:'#dcdcdd',
    silver:'#ebebeb',
    coal: "#111111",
    dirtyNavy: "#1c313a",
    dimBlue: "#0582ca",
  },
  toasts:{
    error:'#d62828',
    success:'#02c39A',
    warning:'#ff9f1c',  
    message:'#ff9f1c',
  },
  gradients: {
    listItem: {
      colors: ["#e9ecef", "#f8f9fa"],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
  breadcrumpSeparator: "#2ec4b64A",
  breadcrumpLevel1:'#3DA5D9',
  breadcrumpLevel2:'#ff9f1c',
  breadcrumpLevel3:'#2ec4b6',
  breadcrumpLevel4:'#e55934',
  breadcrumpLevel5:'#e71d36',
  breadcrumpListAvatar1:'#3DA5D9A4',
  breadcrumpListAvatar2:'#ff9f1cA4',
  breadcrumpListAvatar3:'#2ec4b6A4',
  breadcrumpListAvatar4:'#e5593466',
  breadcrumpListAvatar5:'#e71d3666',
  btnAdd: "#06d6a0",
  btnDelete: "#e55934",
  btnUpdate: "#3DA5D9",
  btnOk: "#5e60ce",
  btnCancel: "#979DAC",
  btnReload: "#00a8e8",
  drawerBackground: "#3a6ea5",
  drawerIcon: "#F1FAEE66",
  homeBackground: "#292f36",
  homeIconBackground1: "#7768ae",
  homeIconBackground2: "#ec9a29",
  homeIconBackground3: "#3bb273",
  homeIconBackground4: "#43EE8b",
  homeIconBackground5: "#577590",
  headerBackground: "#3F51B5",
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
  listItemActionIcon1: "#02c39a",
  listItemCollapseIcon: "#8d99ae55",
  listItemExpandIcon: "#8d99ae55",
  listItemHeaderContainer: "#f1f5f7",
  listItemContentContainer: "#8da9c422",
  listItemContentBorder: "#8da9c488",
  listItemRightAvatar: "#dcdcdd",
  listItemTitleText: "#6c757d",
  listItemSubtitleText: "#6c757dAA",
  listItemSubtitleIcon: "#6c757d66",
  addModalFieldValidationErrorText: "#e71d36",
  screenContainer: "#f8f9fa",
  screenTitleText:'#3F51B5',
  spinner: "#3F51B5A3",
  transparent: "#FFFFFF00",
  tabIconActive: "#F1FAEE",
  tabIconInactive: "#F1FAEE",
  tabBackgroundDefault: "#3F51B5",
  tabBackgroundActive: "#02c39a",

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
  breadCrumpLevel1: { color: globalColors.breadcrumpLevel1 },
  breadCrumpLevel2: { color: globalColors.breadcrumpLevel2, fontWeight: "bold" },
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
  screenTitleContainer: {
    justifyContent:'center',
    alignItems:'center'
  },
  screenTitleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: globalColors.screenTitleText,
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
    marginVertical: 2,
  },
  addModalContainer: {
    padding: 50,
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
    flex:1,
    borderColor: globalColors.inputBorder,
    backgroundColor:'#FFF',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    textAlign: "right",
    alignSelf:'stretch',
  },
  addModalFieldValidationError: {
    textAlign: "right",
    color: globalColors.addModalFieldValidationErrorText,
    marginRight: 20,
  },
  addModalFieldRadioButtonGroupContainer: {
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal: 10,
  },
  radioItemContainer: {
    flex:1,
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
  buttonTexts: {
    yes: "بلی",
    no: "خیر",
    ok: "تأیید",
    cancel: "انصراف",
  },
  titles: {
    syncData: "بروزرسانی داده ها",
  },
  messages: {
    emptyList: "آیتمی برای نمایش وجود ندارد",
  },
  progress:{
    checkingLoginInfo:"در حال بررسی اطلاعات کاربری",
    checkingInternetConnection:"در حال بررسی اتصال به اینترنت",
    creatingPostData:"در حال ایجاد داده های ارسالی",
    connectingToServer:"در حال اتصال به سرور",
    preparingPresentationData:"در حال آماده سازی داده ها برای نمایش",
    synchingServerData:"در حال بروزرسانی داده ها",
    synchingClientData:"در حال همگام سازی داده ها",
    synchingDbData:"در حال بروزرسانی جداول",
    syncingTimeInfo:"در حال همگام سازی اطلاعات زمانی",
  },
  validationErrors: {
    allFieldsAreRequired: "وارد کردن تمام فیلدها الزامیست",
    required: "وارد کردن این فیلد الزامیست",
    notNumber: "مقدار این فیلد میبایست عددی باشد",
    notInGeoRange: "فاصله شما از مقدار تعیین شده بیشتر است. لطفاً به محدوده فروشگاه مورد نظر برگشته و مجددا تلاش فرمایید.",
    locationPermissionDenied: "مجوز دسترسی برنامه به مکان یاب دستگاه الزامیست",
    cameraPermissionDenied: "مجوز دسترسی برنامه به دوربین دستگاه الزامیست",
  },
  actionAndStateErrors: {
    dataInsertFailed: "درج داده ها با خطا مواجه شد",
    dataSelectFailed: "خواندن داده ها با خطا مواجه شد",
    invalidDataFormat: "قالب داده ها صحیح نیست",
    noInternetError: "اتصال به اینترنت برقرار نیست",
    networkError: "خطا در ارتباط با سرور",
    syncServerFailed: "بروزرسانی داده ها با مشکل مواجه شد",
    syncClientFailed: "همگام سازی داده ها با مشکل مواجه شد",
    tableCreationFailed: "ایجاد جدول با مشکل مواجه شد",
    tableDropFailed: "حذف جدول با مشکل مواجه شد",
    tokenExpired: "اعتبار کاربری منقضی شده. ورود مجدد الزامیست",
    saveError: "ذخیره داده ها با خطا مواجه شد. لطفاً دوباره تلاش نمایید",
  },
  Confirmations: {
    deleteProduct: "کالای انتخاب شده حذف شود؟",
    replaceTempVisitPlanResult:'این کالا در لیست پویش این فروشگاه موجود است. داده های جدید جایگزین شوند؟',
    syncClientData: "همگام سازی داده ها انجام شود؟",
    syncProducts: "بروزرسانی کالاها انجام گردد؟",
    continueSyncRatherThanNothingToSyncOnClient: "داده ها تغییر یافته ای برای ارسال وجود ندارد. همگام سازی ادامه یابد؟",
  },
  alerts: {
    syncClientDataDone: "همگام سازی داده ها با موفقیت انجام شد",
    syncServerDataDone: "بروزرسانی داده ها با موفقیت انجام شد",
    nothingToSyncOnServer: "داده ها در وضعیت همگام با سرور قرار دارند",
    nothingToSyncOnClient: "داده ی تغییر یافته ای برای ارسال وجود ندارد",
    visitPlanResultItemAdded: "کالای مربوطه به لیست اضافه شد",
  },
};
