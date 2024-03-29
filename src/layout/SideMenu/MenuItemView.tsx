//
//  MenuItemView.js
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
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { List, useLocation, useTheme, Link, Route, StyleProvider, Text } from '@o2ter/react-ui';

type MenuBase = {
  icon?: React.ReactNode;
  title: string;
  path?: string;
  onPress?: () => void;
  active?: (location: ReturnType<typeof useLocation>) => boolean;
  children?: PageItem[];
};

export type PageItem = React.ComponentPropsWithoutRef<typeof Route> & MenuBase & {
  hidden?: Boolean;
};

type MenuItemProps = MenuBase & {
  style: StyleProp<ViewStyle>;
  themeColor: string;
  section?: boolean;
};

const active_check = (
  location: ReturnType<typeof useLocation>,
  link?: string,
  active?: (location: ReturnType<typeof useLocation>) => boolean,
  children?: PageItem[],
): boolean => {

  const _active = active ?? ((l) => _.isString(link) && `${l.pathname}${l.search}` === link);
  if (_active(location)) return true;

  return _.some(children, (x) => active_check(location, x.path, x.active, x.children));
}

export const MenuItemView = ({
  icon,
  title,
  path,
  onPress,
  active,
  style,
  themeColor,
  section = false,
  children,
}: MenuItemProps) => {

  const location = useLocation();
  const isActive = active_check(location, path, active, children);
  const [focused, setFocused] = React.useState(false);

  const theme = useTheme();

  let label = (
    <Text
      classes={[
        'd-flex flex-nowrap my-0 ps-3',
        section ? 'py-2' : 'py-1',
      ]}
      style={section ? {
        borderLeftWidth: 4,
        borderLeftColor: isActive ? themeColor : 'transparent',
      } : {}}>
      {icon && (
        <StyleProvider components={{
          text: {
            color: focused || isActive ? 'text-primary' : 'inherit',
            fontSize: theme.root.fontSize
          }
        }}>{icon}</StyleProvider>
      )}
      <Text classes={[
        'my-0',
        section ? 'h6' : '',
        icon ? 'ms-1' : '',
        focused || isActive ? 'text-primary' : 'text-body',
      ]}>{title}</Text>
    </Text>
  );

  if (_.isFunction(onPress)) {
    label = (
      <Pressable
        onPress={onPress}
        onHoverIn={() => setFocused(true)}
        onHoverOut={() => setFocused(false)}
      >{label}</Pressable>
    );
  } else if (_.isString(path)) {
    label = (
      <Link
        to={path}
        style={{ textDecoration: 'none' }}
        onHoverIn={() => setFocused(true)}
        onHoverOut={() => setFocused(false)}
      >{label}</Link>
    );
  }

  return (
    <>
      {label}
      {_.isArray(children) && <div className='d-flex flex-column ps-3'>
        <List data={_.filter(children, x => !x.hidden)} renderItem={({ item }) => (
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