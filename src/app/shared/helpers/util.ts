import { defaults } from 'lodash';

export const transformToTree =
  (arr: any[], uniqueKey = 'id', parentKey = 'parentId', children = 'children') => {
    const nodes = {};
    return arr.filter((obj) => {
      const id = obj[uniqueKey];
      const parentId = obj[parentKey];

      nodes[id] = defaults(obj, nodes[id], { children: [] });
      // tslint:disable-next-line:no-unused-expression
      parentId && (nodes[parentId] = (nodes[parentId] || { children: [] }))[children].push(obj);

      return !parentId;
    });
  };

export function mapObjectToArray(obj): Array<{}> {
  return Object.keys(obj)
    .map(id => ({ value: id, name: obj[id] }));
}
