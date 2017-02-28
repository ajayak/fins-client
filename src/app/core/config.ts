const defaultBaseUrl = 'http://localhost:54976';

export const config = {
  urls: {
    base: defaultBaseUrl,
    token: '/connect/token',
    accountGroup: '/api/accountGroup',
    deleteAccountGroup: '/api/accountGroup/accountGroupId/organization/orgId'
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
