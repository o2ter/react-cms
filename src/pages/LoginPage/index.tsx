//
//  index.js
//
//  The MIT License
//  Copyright (c) 2021 - 2023 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import React from 'react';
import { string } from '@o2ter/valid.js';
import { View, Text, Form } from '@o2ter/react-ui';

import Localization from '../../i18n/pages/LoginPage';

const schema = {
  username: string().notEmpty(),
  password: string().notEmpty(),
};

export const LoginPage: React.FC<{
  onLogin: (user: { username: string; password: string; }) => void;
  LoginBrandComponent?: React.ReactNode;
}> = ({
  onLogin,
  LoginBrandComponent,
}) => {

    const localization = Localization.useLocalize();

    return (
      <View
        classes='bg-primary-900 align-items-center justify-content-center'
        style={{
          flex: 1,
        }}
      >
        <View classes='bg-white px-3 py-2 rounded-sm'>
          {LoginBrandComponent}
          <Form
            schema={schema}
            onSubmit={({ username, password }) => onLogin({ username, password })}>

            <View classes='py-1'>
              <View classes='flex-row justify-content-between'>
                <Text>{localization.string('username')}</Text>
                <Form.ErrorMessage name='username' />
              </View>
              <Form.TextField name='username' />
            </View>

            <View classes='py-1'>
              <View classes='flex-row justify-content-between'>
                <Text>{localization.string('password')}</Text>
                <Form.ErrorMessage name='password' />
              </View>
              <Form.TextField secureTextEntry name='password' />
            </View>

            <View classes='py-1'>
              <Form.Button title={localization.string('login')} variant='primary' action='submit' />
            </View>

          </Form>
        </View>
      </View>
    );
  }

export default LoginPage;