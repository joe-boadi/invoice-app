import { useState } from 'react';

// Define the type for the hook
type UseLocalStorageReturnType<T> = [
	T,
	React.Dispatch<React.SetStateAction<T>>
];

const useSessionStorage = <T>(
	key: string,
	initialValue: T
): UseLocalStorageReturnType<T> => {
	// Retrieve the stored value from localStorage, or use the provided initialValue
	const initial =
		JSON.parse(sessionStorage.getItem(key) as string) ?? initialValue;

	// Create state to hold the current value
	const [value, setValue] = useState<T>(initial);

	// Update localStorage whenever the state changes
	const setStoredValue: React.Dispatch<React.SetStateAction<T>> = (
		newValue
	) => {
		setValue(newValue);
		sessionStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setStoredValue];
};

export default useSessionStorage;
