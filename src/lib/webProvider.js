export const postClientData = async (data) => {
    console.log(`🏁 [webProvider.postClientData]`);
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
    console.log(`💬 [webProvider.postClientData] request sent with token: ${userToken}`);
    return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncClientData", requestOptions)
      .then((response) => {
        console.log(`💬 [webProvider.postClientData] gotten response: ${JSON.stringify(response)}`);
        return response.json();
      })
      .then((result) => {
        console.log(`💬 [webProvider.postClientData] parsed result: ${JSON.stringify(result)}`);
        if (result.d.Response.Token) {
          console.log(`💬 [webProvider.postClientData] initial global.userInfo: ${JSON.stringify(global.userInfo)}`);
          global.userInfo.lastSyncDateTime = result.d.LastSyncAtDate;
          global.userInfo.token = result.d.Response.Token;
          global.userInfo.tokenExpirationDateTime = result.d.Response.ExpirationDate;
          console.log(`💬 [webProvider.postClientData] updated global.userInfo: ${JSON.stringify(global.userInfo)}`);
          console.log(`👍 [webProvider.postClientData] returned: ${result.d}`);
          return result.d;
        } else throw new Error(result.d.Response.Message);
      })
      .catch((err) => err);
  };