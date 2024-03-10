import { AgeVerify } from '../../services/ageValidate.service';

describe('AgeVerify', () => {
  it('should return the correct age for a given birthdate', () => {
    const ageVerify = new AgeVerify();
    const age = ageVerify.validate('01/01/1990');
    expect(age).toBe(34);
  });

  it('should return correct age when current date is before the birthdate in the same year', () => {
    const ageVerify = new AgeVerify();
    const age = ageVerify.validate('01/05/1990');
    expect(age).toBe(33);
  });

  it('should return correct age when current date is on the birthdate', () => {
    const ageVerify = new AgeVerify();
    const age = ageVerify.validate('15/03/1990');
    expect(age).toBe(33);
  });
});
