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
import { useToast } from '@o2ter/react-ui';
import { Layout, PageItem } from '../layout';
import { ThemeProvider, ThemeProviderProps } from '../theme';
import Navigator from '../Navigator';
import LoginPage from '../pages/LoginPage';

export const Dashboard: React.FC<{
  LayoutComponent?: React.ComponentType<ComponentPropsWithoutRef<typeof Layout>>;
  LoginComponent?: React.ComponentType<ComponentPropsWithoutRef<typeof LoginPage>>;
  pages: PageItem[];
  logined?: boolean;
} & ComponentPropsWithoutRef<typeof LoginPage> & ThemeProviderProps> = ({
  LayoutComponent = Layout,
  LoginComponent = LoginPage,
  pages,
  logined = false,
  onLogin,
  ...props
}) => {

  const _pages = React.useMemo(
    () => _.flatMapDeep(pages, p => p.children ? [p, ...p.children] : p).filter(x => !_.isNil(x.component)),
    [pages]
  );

  const { showError } = useToast();
  const _showError = React.useCallback((resolve: () => any) => {
    (async () => {
      try { await resolve(); } catch (e) { showError(e as Error); }
    })();
  }, [showError]);

  const _onLogin = React.useCallback((user: { username: string; password: string; }) => void _showError(() => onLogin(user)), [onLogin, _showError]);

  return (
    <ThemeProvider {...props}>
      {!logined ? <LoginComponent onLogin={_onLogin} /> : (
        <LayoutComponent pages={pages}>
          <Navigator pages={_pages} />
        </LayoutComponent>
      )}
    </ThemeProvider>
  );
}