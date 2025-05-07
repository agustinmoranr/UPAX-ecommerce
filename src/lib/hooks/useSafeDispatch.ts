import { useCallback, useLayoutEffect, useRef, type Dispatch } from 'react';

// El tipo genérico <A> representa una acción de cualquier tipo.
export function useSafeDispatch<A>(dispatch: Dispatch<A>): Dispatch<A> {
	const mounted = useRef(false);

	useLayoutEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	return useCallback(
		(action: A) => {
			if (mounted.current) {
				dispatch(action);
			}
		},
		[dispatch],
	);
}

export default useSafeDispatch;
