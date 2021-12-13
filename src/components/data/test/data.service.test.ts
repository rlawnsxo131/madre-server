import 'jest';
import { Connection } from 'typeorm';
import { Database } from '../../../datastore';
import { initializeEnvironment } from '../../../lib';
import { dataService } from '..';
import { ApolloError } from 'apollo-server-core';
import { errorCode } from '../../error';

describe('dataService Test', () => {
  let connection: Connection | null = null;

  beforeAll(async () => {
    initializeEnvironment();
    const database = new Database();
    connection = await database.getConnection();
  });

  afterAll(async () => {
    await connection?.close();
  });

  test('getDataById: id to 0', async () => {
    const id = 0;
    try {
      await dataService.getDataById(id);
    } catch (e) {
      const error = e as ApolloError;
      expect(error.extensions.code).toBe(errorCode.NOT_FOUND);
      expect(error.extensions.id).toBe(id);
    }
  });
});