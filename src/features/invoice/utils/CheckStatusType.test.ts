import { describe, it, expect } from 'vitest';
import checkStatusType from './CheckStatusType';

describe('checkStatusType', () => {
  it('should return "pending" for pending status', () => {
    expect(checkStatusType('pending')).toBe('pending');
  });

  it('should return "draft" for draft status', () => {
    expect(checkStatusType('draft')).toBe('draft');
  });

  it('should return "paid" for paid status', () => {
    expect(checkStatusType('paid')).toBe('paid');
  });

  it('should return "error" for invalid status', () => {
    expect(checkStatusType('invalid')).toBe('error');
    expect(checkStatusType('completed')).toBe('error');
    expect(checkStatusType('')).toBe('error');
  });

  // Edge cases
  it('should handle case-sensitive input correctly', () => {
    expect(checkStatusType('PENDING')).toBe('error');
    expect(checkStatusType('Paid')).toBe('error');
  });

  it('should handle non-string inputs correctly', () => {
    expect(checkStatusType('123' as string)).toBe('error');
    expect(checkStatusType(' ' as string)).toBe('error');
  });
});