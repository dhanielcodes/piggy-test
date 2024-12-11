/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {render, screen} from '@testing-library/react-native';
import {it} from '@jest/globals';

// Mocks for native modules
jest.mock('@react-native-async-storage/async-storage', () => {
  const mock = jest.requireActual(
    '@react-native-async-storage/async-storage/jest/async-storage-mock',
  );
  return mock;
});

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}),
}));

// Helper function to flush all pending promises
const flushPromises = () => new Promise(setImmediate);

jest.setTimeout(150000); // Increase Jest timeout

it('renders correctly', async () => {
  // Use flushPromises to ensure all updates are flushed
  await flushPromises();
  render(<App />);
  // Assert that some UI element exists to verify the component rendered
  const onlineText = await screen.findByText(/Online/);
  expect(onlineText).toBeTruthy();
});
