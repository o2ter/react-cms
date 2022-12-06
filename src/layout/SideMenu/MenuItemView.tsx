//
//  MenuItemView.js
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
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { List, useLocation, Link } from 'o2ter-ui';
import { className } from '../../utils';

export type MenuItem = {
  icon: React.ReactNode;
  title: string;
  link?: string;
  active?: (location: ReturnType<typeof useLocation>) => boolean;
  children?: MenuItem[];
};

type MenuItemProps = MenuItem & {
  style: StyleProp<ViewStyle>;
  themeColor: string;
  section?: boolean;
};

const active_check = (
  location: ReturnType<typeof useLocation>,
  link?: string,
  active?: (location: ReturnType<typeof useLocation>) => boolean,
  children?: MenuItem[],
): boolean => {

  const _active = active ?? ((l) => _.isString(link) && l.pathname === link);
  if (_active(location)) return true;

  return !_.isNil(_.find(children, (x) => active_check(location, x.link, x.active, x.children)));
}

export const MenuItemView = ({
  icon,
  title,
  link,
  active,
  style,
  themeColor,
  section = false,
  children,
}: MenuItemProps) => {

  const location = useLocation();
  const isActive = active_check(location, link, active, children);

  const label = (
    <div
      className={className(
        'd-flex flex-nowrap ps-3',
        section ? 'py-2' : 'py-1',
        isActive ? 'text-primary' : 'text-body',
        _.isString(link) ? 'link-primary' : '',
      )}
      style={section ? {
        borderLeftStyle: 'solid',
        borderLeftWidth: 4,
        borderLeftColor: isActive ? themeColor : 'transparent',
      } : {}}>
      {icon}
      <span className={section ? 'h6 m-0' : ''}>{title}</span>
    </div>
  );

  return (
    <>
      {_.isString(link) ? <Link to={link} style={{ textDecoration: 'none' }}>{label}</Link> : label}
      {_.isArray(children) && <div className='d-flex flex-column ps-3'>
        <List data={children} renderItem={({ item }) => (
          <MenuItemView
            style={style}
            themeColor={themeColor}
            {...item} />
        )} />
      </div>}
    </>
  );
}

export default MenuItemView;