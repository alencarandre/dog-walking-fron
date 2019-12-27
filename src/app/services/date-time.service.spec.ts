import { DateTimeService } from './date-time.service';

describe('HeaderComponent', () => {
  describe('#ansiFormat', () => {
    it('returns datetime in format YYYY-MM-DD HH:mm:ss', () => {
      const service = new DateTimeService(new Date('2732-12-25 13:47:52'));

      expect(service.ansiFormat()).toEqual('2732-12-25 13:47:52')
    });
  });
});
