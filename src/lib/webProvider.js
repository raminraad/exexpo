import NetInfo from "@react-native-community/netinfo";
import * as enums from "../lib/enums";
import * as rxGlobal from "../lib/rxGlobal";
import { authError,webError } from "./errors";

export const syncClientData = async (data) => {
  console.log(`🏁 [webProvider.syncClientData]`);
  let userToken = global.userInfo.token;
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
  return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncClientData", requestOptions)
    .then((response) => {
      console.log(`💬 [webProvider.syncClientData] gotten response: ${JSON.stringify(response)}`);
      return response.json();
    })
    .then((result) => {
      console.log(`💬 [webProvider.syncClientData] parsed result: ${JSON.stringify(result)}`);
      if (result.d.Response.Token) {
        console.log(`💬 [webProvider.syncClientData] initial global.userInfo: ${JSON.stringify(global.userInfo)}`);
        global.userInfo.lastSyncDateTime = result.d.LastSyncAtDate;
        global.userInfo.token = '0cf88527-515e-5cb9-7d50-d79f3693c644';
        // global.userInfo.token = result.d.Response.Token;
        global.userInfo.tokenExpirationDateTime = result.d.Response.ExpirationDate;
        console.log(`💬 [webProvider.syncClientData] updated global.userInfo: ${JSON.stringify(global.userInfo)}`);
        console.log(`👍 [webProvider.syncClientData] returned: ${JSON.stringify(result.d)}`);
        return result.d;
      } else throw new webError(enums.errorCodes.tokenExpired,rxGlobal.globalLiterals.actionAndStateErrors.tokenExpired);
    })
    .catch((err) => {
      console.log(`❌ [webProvider.syncClientData] ${JSON.stringify(err)}`);
      throw err;
    });
};

export const syncServerData = async () => {
  console.log(`🏁 [sqliteProvider.syncServerData]`);
  let userToken = global.userInfo.token;
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
  console.log(`👍 [sqliteProvider.syncServerData] request sent with token: ${userToken}`);
  return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(`💬 [webProvider.syncServerData] parsed result: ${JSON.stringify(result)}`);
      if (result.d.Response.Token) {
        console.log(`💬 [webProvider.syncServerData] initial global.userInfo: ${JSON.stringify(global.userInfo)}`);
        global.userInfo.lastSyncDateTime = result.d.LastSyncAtDate;
        global.userInfo.token = result.d.Response.Token;
        global.userInfo.tokenExpirationDateTime = result.d.Response.ExpirationDate;
        console.log(`💬 [webProvider.syncServerData] updated global.userInfo: ${JSON.stringify(global.userInfo)}`);
        console.log(`👍 [webProvider.syncServerData] returned: ${JSON.stringify(result.d)}`);
        return result.d;
      } else throw new Error(result.d.Response.Message);
    })
    .catch((err) => {
      console.log(`❌ [webProvider.syncServerData] ${err}`);
      throw err;
    });
};

export const checkNet = async () => await NetInfo.fetch().then((state) => state.isConnected);
