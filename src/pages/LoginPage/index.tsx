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
import { string } from 'sugax';
import { Form, shiftColor } from '@o2ter/react-ui';
import { useTheme } from '../../theme';

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

  const theme = useTheme();
  const backgroundColor = shiftColor(theme.themeColors.primary, theme.colorWeights['900']);

  return <div className='d-flex flex-column align-items-center justify-content-center h-100' style={{ backgroundColor }}>
    <div className='d-flex flex-column'>
      <div className='container d-flex flex-column py-3 px-4 border rounded bg-white'>
        {LoginBrandComponent}
        <Form
          schema={schema}
          onSubmit={({ username, password }) => onLogin({ username, password })}>

          <div className='form-group py-1'>
            <label className='small' htmlFor='username'>{localization.string('username')}</label>
            <Form.TextField name='username' style={{ width: '100%', marginHorizontal: 0 }} />
          </div>
          <div className='form-group py-1'>
            <label className='small' htmlFor='password'>{localization.string('password')}</label>
            <Form.TextField secureTextEntry name='password' style={{ width: '100%', marginHorizontal: 0 }} />
          </div>

          <div className='py-2'>
            <Form.Button title={localization.string('login')} variant='primary' action='submit' />
          </div>

        </Form>
      </div>
    </div>
  </div>
}

export default LoginPage;