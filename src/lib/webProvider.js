import NetInfo from "@react-native-community/netinfo";
import * as enums from "../lib/enums";
import * as rxGlobal from "../lib/rxGlobal";
import { authError,webError } from "./errors";

export const syncClientData = async (data) => {
  console.log(`🏁 [webProvider.syncClientData]`);
  let userToken = global.userInfo.token;
  // xxx
  // userToken = '0cf88527-515e-5cb9-7d50-d79f3693c644';   // an expired token
  // xxx
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  let raw = { token: `${userToken}`, syncDataTables: data };

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };
  console.log(`💬 [webProvider.syncClientData] request sent with token: ${userToken}`);

  if (!await checkNet()) throw new webError(enums.webErrors.noInternetError, rxGlobal.globalLiterals.actionAndStateErrors.noInternetError);


  return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncClientData", requestOptions)
    .then((response) => {
      console.log(`💬 [webProvider.syncClientData] gotten response: ${global.dev.vergose?JSON.stringify(response):'--verbose'}`);
      return response.json();
    })
    .then((result) => {
      console.log(`💬 [webProvider.syncClientData] parsed result: ${global.dev.vergose?JSON.stringify(result):'--verbose'}`);
      if (result.d.Response.Token) {
        console.log(`💬 [webProvider.syncClientData] initial global.userInfo: ${JSON.stringify(global.userInfo)}`);
        global.userInfo.lastSyncDateTime = result.d.LastSyncAtDate;
        global.userInfo.token = result.d.Response.Token;
        global.userInfo.tokenExpirationDateTime = result.d.Response.ExpirationDate;
        console.log(`💬 [webProvider.syncClientData] updated global.userInfo: ${JSON.stringify(global.userInfo)}`);
        console.log(`👍 [webProvider.syncClientData] returned: ${global.dev.vergose?JSON.stringify(result.d):'--verbose'}`);
        return result.d;
      } else throw new webError(enums.authErrors.tokenExpired,rxGlobal.globalLiterals.actionAndStateErrors.tokenExpired);
    })
    .catch((err) => {
      console.log(`❌ [webProvider.syncClientData] ${JSON.stringify(err)}`);
      throw err;
    });
};

export const syncServerData = async () => {
  console.log(`🏁 [webProvider.syncServerData]`);
  let userToken = global.userInfo.token;
  // xxx
  // userToken = '0cf88527-515e-5cb9-7d50-d79f3693c644';   // an expired token
  // xxx
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  let raw = { token: `${userToken}` };
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };
  console.log(`💬 [webProvider.syncServerData] request sent with token: ${userToken}`);
  if (!await checkNet()) throw new webError(enums.webErrors.noInternetError, rxGlobal.globalLiterals.actionAndStateErrors.noInternetError);
  return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(`💬 [webProvider.syncServerData] parsed result: ${global.dev.vergose?JSON.stringify(result):'--verbose'}`);
      if (result.d.Response.Token) {
        console.log(`💬 [webProvider.syncServerData] initial global.userInfo: ${JSON.stringify(global.userInfo)}`);
        global.userInfo.lastSyncDateTime = result.d.LastSyncAtDate;
        global.userInfo.token = result.d.Response.Token;
        global.userInfo.tokenExpirationDateTime = result.d.Response.ExpirationDate;
        console.log(`💬 [webProvider.syncServerData] updated global.userInfo: ${JSON.stringify(global.userInfo)}`);
        console.log(`👍 [webProvider.syncServerData] returned: ${global.dev.vergose? JSON.stringify(result.d):'--verbose'}`);
        return result.d;
      } else throw new webError(enums.authErrors.tokenExpired,rxGlobal.globalLiterals.actionAndStateErrors.tokenExpired);
    })
    .catch((err) => {
      console.log(`❌ [webProvider.syncServerData] ${err}`);
      throw err;
    });
};

export const checkNet = async () => await NetInfo.fetch().then((state) => state.isConnected);
