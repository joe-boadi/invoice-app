import { describe, it, expect } from 'vitest';
import formatDate, {formatToDateString } from '../formatDate';

describe('formatDate', () => {
  it('should format a valid date string in MM-DD-YYYY format', () => {
    expect(formatDate('2024-12-29')).toBe('12-29-2024');
  });

  it('should handle invalid date strings gracefully', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date');
  });

  it('should handle edge case dates correctly', () => {
    expect(formatDate('2000-01-01')).toBe('01-01-2000');
    expect(formatDate('1999-12-31')).toBe('12-31-1999');
  });
});

describe('formatToDateString', () => {
  it('should format a valid date string in DD-MMM-YYYY format', () => {
    expect(formatToDateString('2024-12-29')).toBe('29-Dec-2024');
  });

  it('should handle invalid date strings gracefully', () => {
    expect(formatToDateString('invalid-date')).toBe('Invalid Date');
  });

  it('should handle edge case dates correctly', () => {
    expect(formatToDateString('2000-01-01')).toBe('01-Jan-2000');
    expect(formatToDateString('1999-12-31')).toBe('31-Dec-1999');
  });
});
