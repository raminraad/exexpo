export const syncStatuses = Object.freeze({ modified: 1, created: 3, deleted: 5, synced: 7 });
export const authErrors = Object.freeze({ tokenExpired: 120 });
export const dbErrors = Object.freeze({ tableCreationFailed: 200, tableDropFailed: 210, dataInsertFailed: 220 });
export const webErrors = Object.freeze({ noInternetError: 300 });
export const appErrors = Object.freeze({ syncServerFailed: 400, syncClientFailed: 410 });

export const priceTypes = Object.freeze({
  Others: 0,
  Rial: 3,
  Toman: 6,
  USDollor: 9,
  Pound: 12,
  Euro: 15,
  Yuan: 18,
  Manat: 21,
  Ruble: 24,
  Lira: 27,
  Yen: 30,
  Riyal: 33,
  Dinar: 36,
});

export const priceTypesToLiteral = (p) => {
  switch (p) {
    case priceTypes.Others:
      return "سایر";
    case priceTypes.Rial:
      return "ریال";
    case priceTypes.Toman:
      return "تومان";
    case priceTypes.USDollor:
      return "دلار آمریکا";
    case priceTypes.Pound:
      return "پوند انگلیس";
    case priceTypes.Euro:
      return "یورو اروپا";
    case priceTypes.Yuan:
      return "یوان چین";
    case priceTypes.Manat:
      return "منات آذربایجان";
    case priceTypes.Ruble:
      return "روبل روسیه";
    case priceTypes.Lira:
      return "لیر ترکیه";
    case priceTypes.Yen:
      return "ین ژاپن";
    case priceTypes.Riyal:
      return "ریال عربستان";
    case priceTypes.Dinar:
      return "دینار عراق";

    default:
      return "نامشخص";
  }
};

export const languages = Object.freeze({
  etc: 0,
  Persian: 3,
  English: 6,
  French: 9,
  Arabic: 12,
  Chineese: 15,
  German: 18,
  Russian: 21,
  Kurdish: 24,
  Turkish: 27,
});

export const languagesToLiteral = (p) => {
  switch (p) {
    case languages.etc:
      return "زبان های دیگر";
    case languages.Persian:
      return "فارسی";
    case languages.English:
      return "انگلیسی";
    case languages.French:
      return "فرانسوی";
    case languages.Arabic:
      return "عربی";
    case languages.Chineese:
      return "چینی";
    case languages.German:
      return "المانی";
    case languages.Russian:
      return "روسی";
    case languages.Kurdish:
      return "کردی";
    case languages.Turkish:
      return "ترکی";

    default:
      return "نامشخص";
  }
};

export const measurementTypes = Object.freeze({
  Others: 0,
  KiloGram: 3,
  Gram: 6,
  MiliGram: 9,
  Liter: 12,
  MiliLiter: 15,
  CubicCentimeter: 18,
  SquareCentimeter: 21,
  Quantity: 24,
  Package: 27,
  Box: 30,
});

export const measurementTypesToLiteral = (p) => {
  switch (p) {
    case measurementTypes.Others:
      return "سایر";
    case measurementTypes.KiloGram:
      return "کیلو گرم";
    case measurementTypes.Gram:
      return "گرم";
    case measurementTypes.MiliGram:
      return "میلی گرم";
    case measurementTypes.Liter:
      return "لیتر";
    case measurementTypes.MiliLiter:
      return "میلی لیتر";
    case measurementTypes.CubicCentimeter:
      return "سانتیمتر مکعب (سی سی)";
    case measurementTypes.SquareCentimeter:
      return "سانتیمتر مربع";
    case measurementTypes.Quantity:
      return "عدد";
    case measurementTypes.Package:
      return "بسته";
    case measurementTypes.Box:
      return "جعبه";

    default:
      return "نامشخص";
  }
};
