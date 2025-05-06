import { Link as ReactRouterLink, type LinkProps } from 'react-router';
import './link.css';

export function Link({ className, ...props }: LinkProps) {
	return <ReactRouterLink className={className} {...props} />;
}

export default Link;
