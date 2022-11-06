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
import { View, Text, TextStyleProvider, shadeColor, List, ScrollView } from 'o2ter-ui';

import { MenuItem, MenuItemView } from './MenuItemView';
import { BrandDefaultLogo } from './BrandDefaultLogo';

import { useTheme } from '../../theme';

export { MenuItem };

export const SideMenu: React.FC<{
  items: MenuItem[];
}> = ({
  items,
}) => {

  const theme = useTheme();

  const _color = theme.color ?? 'primary'
  const _theme_color = theme.colors[_color] ?? _color;
  const theme_color = shadeColor(_theme_color, 0.4);
  const theme_dark_color = shadeColor(_theme_color, 0.7);

  const style = React.useMemo(() => StyleSheet.create({
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme_color,
      padding: theme.spacer * 0.5,
      gap: theme.spacer * 0.5,
    },
    brandText: {
      fontSize: theme.fontSizes.large ?? theme.fontSizeBase * 1.25,
      color: theme.colorContrast(theme_color),
    },
    container: {
      backgroundColor: theme_dark_color,
    },
    text: {
      color: theme.colorContrast(theme_dark_color),
    },
    menuItemContainer: {
      marginBottom: 'auto',
      margin: theme.spacer * 0.5,
      gap: theme.spacer * 0.5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacer * 0.5,
      borderRadius: 8,
      gap: theme.spacer * 0.5,
    },
  }), [theme]);

  return (
    <View style={style.container}>
      <View style={style.brandContainer}>
        {theme.brandIcon ?? <BrandDefaultLogo name={theme.brandTitle} />}
        <Text style={style.brandText}>{theme.brandTitle}</Text>
      </View>
      <ScrollView>
        <View style={style.menuItemContainer}>
          <TextStyleProvider style={style.text}>
            <List data={items} renderItem={({ item }) => (
              <MenuItemView
                style={style.menuItem}
                themeColor={theme_color}
                {...item} />
            )} />
          </TextStyleProvider>
        </View>
      </ScrollView>
    </View>
  );
}

export default SideMenu;