import type { ComponentProps } from 'react';
import './headings.css';

export function H1({ ...props }: ComponentProps<'h1'>) {
	return <h1 {...props} />;
}

export function H2({ ...props }: ComponentProps<'h2'>) {
	return <h2 {...props} />;
}

export function H3({ ...props }: ComponentProps<'h3'>) {
	return <h3 {...props} />;
}

export function H4({ ...props }: ComponentProps<'h4'>) {
	return <h4 {...props} />;
}

export function H5({ ...props }: ComponentProps<'h5'>) {
	return <h5 {...props} />;
}
