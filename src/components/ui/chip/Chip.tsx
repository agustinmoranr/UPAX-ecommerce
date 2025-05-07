import type { ComponentProps, ReactNode } from 'react';
import './chip.css';

export function Chip({
	// classNames = { wrapper: '', element: '' },
	className,
	afterSlot,
	...props
}: ComponentProps<'span'> & { afterSlot?: ReactNode }) {
	return (
		<div className={`chip ${className}`}>
			<span {...props} />
			{afterSlot}
		</div>
	);
}

export default Chip;
