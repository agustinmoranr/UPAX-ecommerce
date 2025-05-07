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
		<div className='chip'>
			<span {...props} />
		</div>
	);
}

export default Chip;
