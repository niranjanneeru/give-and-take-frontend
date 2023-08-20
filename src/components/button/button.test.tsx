import Button, { ButtonProps } from './button';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button tests', () => {
  test('snapshot', () => {
    const ButtonProps: ButtonProps = { value: 'Button' };

    const element = render(<Button {...ButtonProps} />);

    expect(element).toMatchSnapshot();
  });

  test('if label rendered correctly', () => {
    const ButtonProps: ButtonProps = { value: 'Button' };

    render(<Button {...ButtonProps} />);
    const element = screen.getByTestId('button-test');

    expect(element.getAttribute('value')).toBe('Button');
  });

  test('if onclick is triggered', () => {
    const onClick = jest.fn();
    const ButtonProps: ButtonProps = { value: 'Button', onClick };

    render(<Button {...ButtonProps}></Button>);
    const element = screen.getByTestId('button-test');

    fireEvent.click(element);
    expect(onClick).toBeCalled();
  });
});
