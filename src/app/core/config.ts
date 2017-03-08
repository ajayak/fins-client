// const defaultBaseUrl = 'http://localhost:54976';
const defaultBaseUrl = 'http://localhost:5000';

export const config = {
  urls: {
    base: defaultBaseUrl,
    token: '/connect/token',
    accountGroup: '/api/accountGroup',
    accountGroupDictionary: '/api/accountGroup/list',
    deleteAccountGroup: '/api/accountGroup/accountGroupId/organization/orgId',
    account: '/api/account'
  },
  appKeys: {
    jwtAccessKey: 'fins_app_access',
    jwtIdKey: 'fins_app_id',
    storeKey: 'fins_store_state'
  }
};

export const UserTypes = {
  siteAdmin: 'SiteAdmin',
  orgAdmin: 'OrgAdmin',
  basicUser: 'BasicUser'
};

export const Accounting = {
  accountGroupManager: 'AccountGroupManager'
};
