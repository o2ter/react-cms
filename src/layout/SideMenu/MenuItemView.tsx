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
import { View, Text, useLocation, TextStyleProvider, Link } from 'o2ter-ui';

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
  children,
}: MenuItemProps) => {

  const location = useLocation();
  const isActive = active_check(location, link, active, children);

  const label = (
    <View style={[style, isActive ? { backgroundColor: themeColor } : {}]}>
      <TextStyleProvider style={{ opacity: isActive ? 0.75 : 0.5 }}>
        {icon}
        <Text>{title}</Text>
      </TextStyleProvider>
    </View>
  );

  return (
    <>
      {_.isString(link) ? <Link to={link} style={{ textDecoration: 'none' }}>{label}</Link> : label}
      {_.isArray(children) && React.Children.map(children, (item) => (
        <MenuItemView
          style={style}
          themeColor={themeColor}
          {...item} />
      ))}
    </>
  );
}

export default MenuItemView;