import 'react-native';
import {it, describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import axios from 'axios';
import { getEventImages } from '../../../services/event.service';

jest.mock('axios');

describe('getEventImages', () => {
  it('fetches successfully data from an API', async () => {
    const data = { greeting: 'Hello, World!' };
    axios.get.mockResolvedValueOnce({ data });

    // Assuming getEventImages uses axios internally
    const result = await getEventImages();

    expect(result).toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Assuming getEventImages uses axios internally
    await expect(getEventImages()).rejects.toThrow(errorMessage);
  });
});
