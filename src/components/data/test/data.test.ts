import 'jest';
import { Connection } from 'typeorm';
import { Database } from '../../../datastore';
import { initializeEnvironment } from '../../../lib';
import { dataService } from '..';
import { ApolloError } from 'apollo-server-core';
import { errorService } from '../../error';

describe('data Test', () => {
  let connection: Connection | null = null;

  beforeAll(async () => {
    initializeEnvironment();
    const database = new Database();
    connection = await database.getConnection();
  });

  afterAll(async () => {
    await connection?.close();
  });

  test('getData: id to 0 and throw', async () => {
    const id = 0;
    try {
      const data = await dataService.getData(id);
      errorService.throwApolloError({
        resolver: () => !data,
        message: 'Not Found Data',
        code: 'NOT_FOUND',
        params: { id },
      });
    } catch (e) {
      const error = e as ApolloError;
      expect(error.extensions.code).toBe(errorService.ERROR_CODE.NOT_FOUND);
      expect(error.extensions.id).toBe(id);
    }
  });
});