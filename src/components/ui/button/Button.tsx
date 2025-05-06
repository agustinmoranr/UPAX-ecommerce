import type { ComponentProps } from 'react';
import './button.css';

export function Button({ ...props }: ComponentProps<'button'>) {
	return <button {...props} />;
}

export default Button;
