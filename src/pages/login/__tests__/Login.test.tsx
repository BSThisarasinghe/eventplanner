import 'react-native';
import {it, describe, expect, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import Login from '../Login';

describe('Login', () => {
  it('renders correctly', () => {
    const navigation = {navigate: () => {}}

    const page = render(<Login navigation={navigation} />)

    const loginButton = page.getByTestId('loginButton');

    fireEvent.press(loginButton);

    expect(navigation.navigate).toHaveBeenCalled();
  });

  it('navigate to register page', () => {
    const navigation = {navigate: () => {}}
    // spyOn(navigation, 'navigate');

    const page = render(<Login navigation={navigation} />)

    const regiterButton = page.getByTestId('regiterButton');

    fireEvent.press(regiterButton);

    expect(navigation.navigate).toHaveBeenCalledWith("Sign Up");
  });
})