//
//  index.js
//
//  Copyright (c) 2021 - 2022 O2ter Limited. All rights reserved.
//

import _ from 'lodash';
import React from 'react';
import uuid from 'react-native-uuid';
import { Navigator as _Navigator, Route } from 'o2ter-ui';
import NotFound from '../../pages/NotFound';

const _id = uuid.v4();

export const Navigator = ({ pages }) => (
  <_Navigator>
    {pages?.map(({ path, ...props }) => (
      <Route key={`${_id}-${path}`} path={path} {...props} />
    ))}
    {_.isNil(_.find(pages, p => p.path === '*')) && <Route path='*' title='404 Not Found' statusCode={404} component={NotFound} />}
  </_Navigator>
);

export default Navigator;