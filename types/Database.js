/* @flow */

type TableName = string;
type Item = Object;
type Values = Object;
type Key = Object;
type KeyConditionExpression = string;
type ExpressionAttributeValues = Object;

type Put = (
  method: 'put',
  { TableName: TableName, Item: Item }
) => Promise<Object>;

type Get = (
  method: 'get',
  { TableName: TableName, Key: Key }
) => Promise<Object>;

type Query = (
  method: 'query',
  {
    TableName: TableName,
    KeyConditionExpression: KeyConditionExpression,
    ExpressionAttributeValues: ExpressionAttributeValues,
  }
) => Promise<Object>;

type Delete = (
  method: 'delete',
  { TableName: TableName, Key: Key }
) => Promise<Object>;

type Update = (
  method: 'update',
  { TableName: TableName, Key: Key, Values: Values }
) => Promise<Object>;

export type Database = Put | Get | Query | Delete | Update;

export type DatabaseMethod = (method: string, args: any) => Promise<Object>;
