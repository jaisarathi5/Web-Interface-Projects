import {
  calculatePercentage,
  isPass,
  formatTime,
  getTotalMarks,
  getDifficultyColor,
} from './quizUtils';

describe('quizUtils', () => {
  describe('calculatePercentage', () => {
    it('returns 0 when total is 0', () => {
      expect(calculatePercentage(5, 0)).toBe(0);
    });
    it('calculates correct percentage', () => {
      expect(calculatePercentage(7, 10)).toBe(70);
      expect(calculatePercentage(3, 4)).toBe(75);
    });
    it('rounds to nearest integer', () => {
      expect(calculatePercentage(1, 3)).toBe(33);
    });
  });

  describe('isPass', () => {
    it('returns true if percentage >= passingPercentage', () => {
      expect(isPass(75, 60)).toBe(true);
      expect(isPass(60, 60)).toBe(true);
    });
    it('returns false if percentage < passingPercentage', () => {
      expect(isPass(59, 60)).toBe(false);
    });
  });

  describe('formatTime', () => {
    it('formats seconds to MM:SS', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(5)).toBe('00:05');
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(3661)).toBe('61:01'); // over 60 minutes
    });
    it('pads with leading zeros', () => {
      expect(formatTime(9)).toBe('00:09');
      expect(formatTime(125)).toBe('02:05');
    });
  });

  describe('getTotalMarks', () => {
    it('sums marks of questions', () => {
      const questions = [
        { marks: 2 },
        { marks: 3 },
        { marks: 1 },
      ];
      expect(getTotalMarks(questions)).toBe(6);
    });
    it('defaults to 1 if marks is missing', () => {
      const questions = [
        { text: 'q1' }, // no marks
        { marks: 2 },
      ];
      expect(getTotalMarks(questions)).toBe(3);
    });
  });

  describe('getDifficultyColor', () => {
    it('returns correct color for Easy', () => {
      expect(getDifficultyColor('Easy')).toBe('#22c55e');
    });
    it('returns correct color for Medium', () => {
      expect(getDifficultyColor('Medium')).toBe('#f59e0b');
    });
    it('returns correct color for Hard', () => {
      expect(getDifficultyColor('Hard')).toBe('#ef4444');
    });
    it('returns default color for unknown', () => {
      expect(getDifficultyColor('Unknown')).toBe('#6b7280');
    });
  });
});