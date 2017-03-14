import { defaults } from 'lodash';

export const transformToTree =
  (arr: any[], uniqueKey = 'id', parentKey = 'parentId', children = 'children') => {
    let nodes = {};
    return arr.filter((obj) => {
      let id = obj[uniqueKey];
      let parentId = obj[parentKey];

      nodes[id] = defaults(obj, nodes[id], { children: [] });
      // tslint:disable-next-line:no-unused-expression
      parentId && (nodes[parentId] = (nodes[parentId] || { children: [] }))[children].push(obj);

      return !parentId;
    });
  };
