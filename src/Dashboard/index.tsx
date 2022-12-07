//
//  index.tsx
//
//  The MIT License
//  Copyright (c) 2021 - 2022 O2ter Limited. All rights reserved.
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
import React, { ComponentPropsWithoutRef } from 'react';
import { Route } from 'o2ter-ui';

import {
  ActivityIndicatorProvider,
  ToastProvider,
  ModalProvider,
  ProviderChain,
} from '../components';

import { Layout, MenuItem } from '../layout';
import { ThemeProvider, ThemeProviderProps } from '../theme';
import Navigator from '../components/Navigator';

const appProviders = [
  ActivityIndicatorProvider,
  ToastProvider,
  ModalProvider,
]

export const Dashboard: React.FC<{
  LayoutComponent?: React.ComponentType<ComponentPropsWithoutRef<typeof Layout>>;
  LoginComponent?: React.ComponentType;
  logined?: boolean;
  pages: ComponentPropsWithoutRef<typeof Route>[];
  menu: MenuItem[];
} & ThemeProviderProps> = ({
  LayoutComponent = Layout,
  LoginComponent,
  logined = false,
  pages,
  menu,
  ...props
}) => (
  <ThemeProvider {...props}>
    <ProviderChain providers={appProviders}>
      {!logined && !_.isNil(LoginComponent) ? <LoginComponent /> : (
        <LayoutComponent menu={menu}>
          <Navigator pages={pages} />
        </LayoutComponent>
      )}
    </ProviderChain>
  </ThemeProvider>
)
