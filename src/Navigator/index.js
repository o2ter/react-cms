//
//  index.js
//
//  Copyright (c) 2021 - 2022 O2ter Limited. All rights reserved.
//

import _ from 'lodash';
import React from 'react';
import { ErrorBoundary, Navigator as _Navigator, Route } from 'o2ter-ui';
import NotFound from '../pages/NotFound';
import ErrorPage from '../pages/ErrorPage';

export const Navigator = ({ pages }) => {

  const id = React.useId();

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <_Navigator>
        {pages?.map(({ path, ...props }) => (
          <Route key={`${id}-${path}`} path={path} {...props} />
        ))}
        {_.isNil(_.find(pages, p => p.path === '*')) && <Route path='*' title='404 Not Found' statusCode={404} component={NotFound} />}
      </_Navigator>
    </ErrorBoundary>
  );
};

export default Navigator;