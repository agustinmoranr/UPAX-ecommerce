import { useCallback, useReducer, useRef } from 'react';
import useSafeDispatch from './useSafeDispatch';

type AsyncState<T> = {
	status: 'idle' | 'pending' | 'resolved' | 'rejected';
	data: T | null;
	error: unknown;
};

type AsyncAction<T> = Partial<AsyncState<T>>;

export interface AsyncOutput<T> extends AsyncState<T> {
	isIdle: boolean;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	setData: (data: T) => void;
	setError: (error: unknown) => void;
	run: (promise: Promise<T>) => Promise<T>;
	reset: () => void;
}

const defaultInitialState: AsyncState<unknown> = {
	status: 'idle',
	data: null,
	error: null,
};

export function useAsync<T>(
	initialState?: Partial<AsyncState<T>>,
): AsyncOutput<T> {
	const initialStateRef = useRef<AsyncState<T>>({
		...defaultInitialState,
		...initialState,
	} as AsyncState<T>);

	const [{ status, data, error }, setState] = useReducer(
		(s: AsyncState<T>, a: AsyncAction<T>): AsyncState<T> => ({ ...s, ...a }),
		initialStateRef.current,
	);

	const safeSetState = useSafeDispatch<AsyncAction<T>>(setState);

	const run = useCallback(
		(promise: Promise<T>): Promise<T> => {
			if (!promise || typeof promise.then !== 'function') {
				throw new Error(
					`The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
				);
			}
			safeSetState({ status: 'pending' });
			return promise.then(
				(data) => {
					safeSetState({ data, status: 'resolved' });
					return data;
				},
				(error) => {
					safeSetState({ status: 'rejected', error });
					return Promise.reject(error);
				},
			);
		},
		[safeSetState],
	);

	const setData = useCallback(
		(data: T) => safeSetState({ data }),
		[safeSetState],
	);

	const setError = useCallback(
		(error: unknown) => safeSetState({ error }),
		[safeSetState],
	);

	const reset = useCallback(
		() => safeSetState(initialStateRef.current),
		[safeSetState],
	);

	return {
		isIdle: status === 'idle',
		isLoading: status === 'pending',
		isError: status === 'rejected',
		isSuccess: status === 'resolved',

		setData,
		setError,
		error,
		status,
		data,
		run,
		reset,
	};
}

export default useAsync;
