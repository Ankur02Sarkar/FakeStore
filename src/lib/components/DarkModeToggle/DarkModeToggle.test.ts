// src/components/DarkModeToggle.test.ts

import { render, fireEvent } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import DarkModeToggle from './DarkModeToggle.svelte'; // Ensure this path is correct
import '@testing-library/jest-dom'; // Import matchers

// Mock localStorage
const localStorageMock = (() => {
	let store = {} as Record<string, string>;
	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value;
		}),
		clear: vi.fn(() => {
			store = {};
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key];
		})
	};
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('DarkModeToggle', () => {
	beforeEach(() => {
		localStorageMock.getItem.mockClear();
		localStorageMock.setItem.mockClear();
		document.documentElement.classList.remove('dark');
		document.documentElement.setAttribute('style', 'color-scheme: light;');
	});

	it('renders correctly', () => {
		const { container } = render(DarkModeToggle);
		expect(container).toBeInTheDocument();
	});

	it('toggles dark mode on click', async () => {
		const { container } = render(DarkModeToggle);
		const toggleButton = container.querySelector('.flex');

		if (!toggleButton) {
			throw new Error('Toggle button not found');
		}

		// Initial state should be light mode
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(document.documentElement.getAttribute('style')).toBe('color-scheme: light;');

		// Simulate a click to turn on dark mode
		await fireEvent.click(toggleButton);

		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(document.documentElement.getAttribute('style')).toBe('color-scheme: dark;');
		expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'true');

		// Simulate another click to turn off dark mode
		await fireEvent.click(toggleButton);

		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(document.documentElement.getAttribute('style')).toBe('color-scheme: light;');
		expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'false');
	});

	it('initializes with light mode based on localStorage', () => {
		localStorageMock.getItem.mockReturnValue('false');
		render(DarkModeToggle);

		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(document.documentElement.getAttribute('style')).toBe('color-scheme: light;');
	});
});
