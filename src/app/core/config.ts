// const defaultBaseUrl = 'http://localhost:54976';
const defaultBaseUrl = 'http://localhost:5000';

export const config = {
  urls: {
    base: defaultBaseUrl,
    token: '/connect/token',
    accountGroup: '/api/accountGroup',
    accountGroupDictionary: '/api/accountGroup/list',
    account: '/api/account',
    itemGroup: '/api/itemGroup',
    itemGroupDictionary: '/api/itemGroup/list',
    item: '/api/item',
    states: '/api/state',
    unit: '/api/unit'
  },
  appKeys: {
    jwtAccessKey: 'fins_app_access',
    jwtIdKey: 'fins_app_id',
    storeKey: 'fins_store_state'
  },
  constants: {
    maxItemImageSize: 2,
    allowedImageFormats: ['.png', '.img', '.jpeg', '.jpg']
  }
};

export const UserTypes = {
  siteAdmin: 'SiteAdmin',
  orgAdmin: 'OrgAdmin',
  basicUser: 'BasicUser'
};

export const Accounting = {
  accountGroupManager: 'AccountGroupManager',
  accountManager: 'AccountManager'
};

export const Inventory = {
  itemGroupManager: 'ItemGroupManager',
  itemManager: 'ItemManager'
};
