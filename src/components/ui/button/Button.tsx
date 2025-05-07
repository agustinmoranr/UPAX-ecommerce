import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import styles from './button.module.css';

const button = cva(styles.base, {
	variants: {
		variant: {
			primary: styles.primary,
			secondary: styles.secondary,
		},
		size: {
			small: styles.small,
			medium: styles.medium,
		},
		disabled: {
			false: styles.enabled,
			true: styles.disabled,
		},
	},
	compoundVariants: [
		{ variant: 'primary', size: 'medium', className: styles.primaryMedium },
	],
	defaultVariants: {
		variant: 'primary',
		size: 'medium',
		disabled: false,
	},
});

export interface ButtonProps
	extends Omit<ComponentProps<'button'>, 'disabled'>,
		VariantProps<typeof button> {}

export function Button({
	className,
	variant,
	size,
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			className={button({ variant, size, disabled, className })}
			disabled={disabled || undefined}
			{...props}
		/>
	);
}

export default Button;
