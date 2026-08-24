import { render, screen, act } from '@testing-library/react';
import Timer from './Timer';

jest.useFakeTimers();

describe('Timer', () => {
  const onTimeUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial time correctly', () => {
    render(<Timer duration={5} onTimeUp={onTimeUp} />);
    expect(screen.getByText('05:00')).toBeInTheDocument();
  });

  it('counts down every second', () => {
    render(<Timer duration={2} onTimeUp={onTimeUp} />);
    expect(screen.getByText('02:00')).toBeInTheDocument();

    act(() => { jest.advanceTimersByTime(1000); });
    expect(screen.getByText('01:59')).toBeInTheDocument();

    act(() => { jest.advanceTimersByTime(1000); });
    expect(screen.getByText('01:58')).toBeInTheDocument();
  });

  it('calls onTimeUp when time reaches 0', () => {
    render(<Timer duration={1} onTimeUp={onTimeUp} />);
    expect(onTimeUp).not.toHaveBeenCalled();

    act(() => { jest.advanceTimersByTime(60 * 1000); });
    expect(onTimeUp).toHaveBeenCalledTimes(1);
  });

  it('pauses when isPaused is true', () => {
    render(<Timer duration={3} onTimeUp={onTimeUp} isPaused={true} />);
    const initialText = screen.getByText('03:00');
    expect(initialText).toBeInTheDocument();

    act(() => { jest.advanceTimersByTime(2000); });
    // should still be 03:00 because paused
    expect(screen.getByText('03:00')).toBeInTheDocument();
  });

  it('resumes when isPaused becomes false', () => {
    const { rerender } = render(<Timer duration={3} onTimeUp={onTimeUp} isPaused={true} />);
    expect(screen.getByText('03:00')).toBeInTheDocument();

    // update prop
    rerender(<Timer duration={3} onTimeUp={onTimeUp} isPaused={false} />);
    act(() => { jest.advanceTimersByTime(1000); });
    expect(screen.getByText('02:59')).toBeInTheDocument();
  });

  it('shows low and critical styles when time is low', () => {
    render(<Timer duration={1} onTimeUp={onTimeUp} />);
    // Initially not low
    const timerDiv = screen.getByText('01:00').closest('.timer');
    expect(timerDiv).not.toHaveClass('timer-low');
    expect(timerDiv).not.toHaveClass('timer-critical');

    act(() => { jest.advanceTimersByTime(30 * 1000); }); // 30 seconds left
    expect(screen.getByText('00:30')).toBeInTheDocument();
    // After 30 seconds, it should be low (less than 60s) but not critical (less than 30s)
    expect(timerDiv).toHaveClass('timer-low');
    expect(timerDiv).not.toHaveClass('timer-critical');

    act(() => { jest.advanceTimersByTime(25 * 1000); }); // 5 seconds left
    expect(screen.getByText('00:05')).toBeInTheDocument();
    expect(timerDiv).toHaveClass('timer-critical');
  });
});