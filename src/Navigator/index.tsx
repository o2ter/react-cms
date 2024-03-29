//
//  index.tsx
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
import { ErrorBoundary, Navigator as _Navigator, Route } from '@o2ter/react-ui';
import NotFound from '../pages/NotFound';
import ErrorPage from '../pages/ErrorPage';

type NavigatorProps = {
  pages?: React.ComponentPropsWithoutRef<typeof Route>[];
  onError?: (error: Error, info: React.ErrorInfo) => void;
};

const withError = (
  Component: any,
  onError?: (error: Error, info: React.ErrorInfo) => void,
) => () => (
  <ErrorBoundary onError={onError} fallback={(error) => <ErrorPage />}>
    <Component />
  </ErrorBoundary>
);

export const Navigator: React.FC<NavigatorProps> = ({
  pages,
  onError,
}) => {
  const id = React.useId();
  return (
    <_Navigator>
      {pages?.map(({ path, component, ...props }) => (
        <Route key={`${id}-${path}`} path={path} component={withError(component, onError)} {...props} />
      ))}
      {!_.some(pages, p => p.path === '*') && (
        <Route path='*' title='404 Not Found' statusCode={404} component={NotFound} />
      )}
    </_Navigator>
  );
};

Navigator.displayName = 'Navigator';
