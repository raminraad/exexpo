import moment from "jalali-moment";
import * as rxGlobal from "../lib/rxGlobal";

let week = new Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه");
let months = new Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند");

export const toLongPersian = (dateString) => {
  let inputDate = new Date(dateString);
  let d = inputDate.getDay();
  let day = inputDate.getDate();
  let month = inputDate.getMonth() + 1;
  let year = inputDate.getYear();
  year = false ? year : 1900 + year;
  if (year == 0) {
    year = 2000;
  }
  if (year < 100) {
    year += 1900;
  }
  let y = 1;
  for (let i = 0; i < 3000; i += 4) {
    if (year == i) {
      y = 2;
    }
  }
  for (let i = 1; i < 3000; i += 4) {
    if (year == i) {
      y = 3;
    }
  }
  if (y == 1) {
    year -= month < 3 || (month == 3 && day < 21) ? 622 : 621;
    switch (month) {
      case 1:
        day < 21 ? ((month = 10), (day += 10)) : ((month = 11), (day -= 20));
        break;
      case 2:
        day < 20 ? ((month = 11), (day += 11)) : ((month = 12), (day -= 19));
        break;
      case 3:
        day < 21 ? ((month = 12), (day += 9)) : ((month = 1), (day -= 20));
        break;
      case 4:
        day < 21 ? ((month = 1), (day += 11)) : ((month = 2), (day -= 20));
        break;
      case 5:
      case 6:
        day < 22 ? ((month -= 3), (day += 10)) : ((month -= 2), (day -= 21));
        break;
      case 7:
      case 8:
      case 9:
        day < 23 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 22));
        break;
      case 10:
        day < 23 ? ((month = 7), (day += 8)) : ((month = 8), (day -= 22));
        break;
      case 11:
      case 12:
        day < 22 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 21));
        break;
      default:
        break;
    }
  }
  if (y == 2) {
    year -= month < 3 || (month == 3 && day < 20) ? 622 : 621;
    switch (month) {
      case 1:
        day < 21 ? ((month = 10), (day += 10)) : ((month = 11), (day -= 20));
        break;
      case 2:
        day < 20 ? ((month = 11), (day += 11)) : ((month = 12), (day -= 19));
        break;
      case 3:
        day < 20 ? ((month = 12), (day += 10)) : ((month = 1), (day -= 19));
        break;
      case 4:
        day < 20 ? ((month = 1), (day += 12)) : ((month = 2), (day -= 19));
        break;
      case 5:
        day < 21 ? ((month = 2), (day += 11)) : ((month = 3), (day -= 20));
        break;
      case 6:
        day < 21 ? ((month = 3), (day += 11)) : ((month = 4), (day -= 20));
        break;
      case 7:
        day < 22 ? ((month = 4), (day += 10)) : ((month = 5), (day -= 21));
        break;
      case 8:
        day < 22 ? ((month = 5), (day += 10)) : ((month = 6), (day -= 21));
        break;
      case 9:
        day < 22 ? ((month = 6), (day += 10)) : ((month = 7), (day -= 21));
        break;
      case 10:
        day < 22 ? ((month = 7), (day += 9)) : ((month = 8), (day -= 21));
        break;
      case 11:
        day < 21 ? ((month = 8), (day += 10)) : ((month = 9), (day -= 20));
        break;
      case 12:
        day < 21 ? ((month = 9), (day += 10)) : ((month = 10), (day -= 20));
        break;
      default:
        break;
    }
  }
  if (y == 3) {
    year -= month < 3 || (month == 3 && day < 21) ? 622 : 621;
    switch (month) {
      case 1:
        day < 20 ? ((month = 10), (day += 11)) : ((month = 11), (day -= 19));
        break;
      case 2:
        day < 19 ? ((month = 11), (day += 12)) : ((month = 12), (day -= 18));
        break;
      case 3:
        day < 21 ? ((month = 12), (day += 10)) : ((month = 1), (day -= 20));
        break;
      case 4:
        day < 21 ? ((month = 1), (day += 11)) : ((month = 2), (day -= 20));
        break;
      case 5:
      case 6:
        day < 22 ? ((month -= 3), (day += 10)) : ((month -= 2), (day -= 21));
        break;
      case 7:
      case 8:
      case 9:
        day < 23 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 22));
        break;
      case 10:
        day < 23 ? ((month = 7), (day += 8)) : ((month = 8), (day -= 22));
        break;
      case 11:
      case 12:
        day < 22 ? ((month -= 3), (day += 9)) : ((month -= 2), (day -= 21));
        break;
      default:
        break;
    }
  }
  return week[d] + " " + day + " " + months[month - 1] + " " + year;
};

export const toShortPersian = (date) => {
  moment.locale("en"); // default locale is en
  let m = moment(date, "YYYY/MM/DD");
  return m.format("jYYYY/jMM/jDD ");
};

export const getDateTimeFromWebService = async () => {
  let headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("https://api.keybit.ir/time", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.date) {
        let output = {
          persianDate: result.date.full.official.iso.en,
          gregorianDate: result.date.other.gregorian.iso.en,
          time24: result.time24.full.en,
          time12: result.time12.full.full.en,
        };
        console.log(`👍 [calendarLib.getDateTimeFromWebService] : ${JSON.stringify(output)}`);
        return output;
      } else throw new Error(rxGlobal.globalLiterals.actionAndStateErrors.invalidDataFormat);
    })
    .catch((error) => {
      console.log(`❌ [calendarLib.getDateTimeFromWebService] : ${error}`);
      return null;
    });
};

export const toShortGregorian = (input, format) => moment.from(input, "fa", format).locale("en").format("YYYY/MM/DD ");
