import type { ComponentProps } from 'react';
import './chip.css';

export function Chip({
	classNames = { wrapper: '', element: '' },
	className,
	...props
}: ComponentProps<'span'> & {
	classNames?: { wrapper: string; element: string };
}) {
	return (
		<div className={classNames.wrapper}>
			<span className={`${classNames.wrapper} ${className}`} {...props} />
		</div>
	);
}

export default Chip;
