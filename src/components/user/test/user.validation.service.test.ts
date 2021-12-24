import 'jest';
import { userValidationService } from '..';

describe('userValidationService Test', () => {
  test('getUserParamsValidation', () => {
    const id = '';
    try {
      userValidationService.getUserParamsValidation(id);
    } catch (e: any) {
      expect(e.extensions.code).toBe('BAD_USER_INPUT');
      expect(e.extensions.id).toBe(id);
    }
  });
});
