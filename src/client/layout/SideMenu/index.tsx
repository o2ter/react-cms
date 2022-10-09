//
//  index.js
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
import { StyleSheet } from 'react-native';
import { View, Text, shiftColor } from 'o2ter-ui';

import { useTheme } from '../../theme';

export type MenuItem = {
  icon: React.ReactNode;
  title: string;
  children: MenuItem[];
}

export const SideMenu: React.FC<{
  items: MenuItem[];
}> = ({
  items,
}) => {

  const theme = useTheme();

  const _color = theme.color ?? 'primary'
  const theme_color = theme.colors[_color] ?? _color;

  const style = React.useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: theme_color,
    },
    text: {
      color: theme.colorContrast(theme_color),
    },
  }), [theme]);

  return (
    <View style={style.container}>
      <View style={{ flexDirection: 'row' }}>
        {theme.brandIcon}
        <Text style={style.text}>{theme.brandTitle}</Text>
      </View>
      <View style={{ marginBottom: 'auto' }}>
      </View>
    </View>
  );
}

export default SideMenu;