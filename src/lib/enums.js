export const syncStatuses = Object.freeze({modified:1, created:3, deleted:5, synced:7});
export const authErrors = Object.freeze({tokenExpired:120});
export const dbErrors = Object.freeze({tableCreationFailed:200,tableDropFailed:210,dataInsertFailed:220});
export const webErrors = Object.freeze({noInternet:300});
export const appErrors = Object.freeze({syncServerFailed:400,syncClientFailed:410});