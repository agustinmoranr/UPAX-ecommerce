import type { ComponentProps } from 'react';

import './pageContainer.css';

function PageContainer({ className = '', ...props }: ComponentProps<'main'>) {
	return <main className={`page-container ${className}`} {...props} />;
}

export default PageContainer;
