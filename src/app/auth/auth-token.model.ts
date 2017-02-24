import isNil from 'lodash/isNil';

interface TokenModel {
  'unique_name': string;
  'role': string | string[];
  'ar:organizationid': string | string[];
  'fs:usertype': string | string[];
  'fs:accessLevel': string | string[];
}

const convertStringToArray = (value: string | string[]): string[] => {
  if (!isNil(value)) {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  }
  return value;
};

export class AuthTokenModel {
  public username: string;
  public role: string[];
  public organizationId: number[];
  public userType: string[];
  public AccessLevel: string[];

  constructor(decodedToken: TokenModel) {
    this.username = decodedToken.unique_name;
    this.role = convertStringToArray(decodedToken.role);
    this.AccessLevel = convertStringToArray(decodedToken['fs:usertype']);
    this.userType = convertStringToArray(decodedToken['fs:usertype']);
    this.organizationId =
      convertStringToArray(decodedToken['fs:organizationid'])
        .map(id => parseInt(id, 10));
  }
}
