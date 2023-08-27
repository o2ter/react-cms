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
import { Pressable, StyleSheet } from 'react-native';
import { SideMenu, PageItem } from './SideMenu';
import { BrandDefaultLogo } from './BrandDefaultLogo';
import { Icon, StyleProvider, useSafeAreaInsets, useTheme } from '@o2ter/react-ui';

import Localization from '../i18n/layout/SideMenu';
import { setPreferredLocale, useLocalize } from '@o2ter/i18n';

export { PageItem };

export const Layout: React.FC<React.PropsWithChildren<{
  color?: string;
  pages: PageItem[];
  onLogout?: () => void;
  locales?: { locale: string; label: string; }[]
  brandIcon?: React.ReactNode;
  brandTitle?: string;
  LayoutBrandComponent?: React.ReactNode;
  headerContainerStyle?: React.CSSProperties;
  menuContainerStyle?: React.CSSProperties;
}>> = ({
  color,
  pages,
  onLogout,
  locales = [],
  brandIcon,
  brandTitle,
  LayoutBrandComponent,
  headerContainerStyle,
  menuContainerStyle,
  children
}) => {

  const localization = Localization.useLocalize();

  const theme = useTheme();
  const mobile = theme.mediaSelect('sm', { up: false, down: true });

  const [openMenu, setOpenMenu] = React.useState(false);
  const { left } = useSafeAreaInsets();

  const _color = color ?? 'primary';
  const themeColor = theme.themeColors[_color] ?? theme.colors[_color] ?? _color;

  const style = React.useMemo(() => StyleSheet.create({
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacer * 0.5,
      borderRadius: 8,
      gap: theme.spacer * 0.5,
    },
  }), [theme]);

  const localize = useLocalize();
  const currentLocale = localize(_.fromPairs(_.map(locales, ({ locale }) => [locale, locale])));

  return (
    <>
      <div className='sticky-top'>
        <header className='d-flex py-2 px-4 border-bottom bg-white' style={headerContainerStyle}>
          <div className='d-flex flex-row align-items-center w-100'>
            {mobile && (
              <Pressable onPress={() => setOpenMenu(v => !v)}>
                <Icon icon='Feather' name='menu' />
              </Pressable>
            )}
            {_.isNil(LayoutBrandComponent) ? (
              <>
                {brandIcon ?? <BrandDefaultLogo name={brandTitle} />}
                {brandTitle && <span className='h3 m-0 ms-3 col-auto'>{brandTitle}</span>}
              </>
            ) : LayoutBrandComponent}
            {!_.isEmpty(locales) && <div className='ms-auto col-auto'>
              <select className="form-select" onChange={(e) => { setPreferredLocale(e.target.value); }}>
                {_.map(locales, ({ locale, label }) => (
                  currentLocale === locale ? <option selected value={locale}>{label}</option> : <option value={locale}>{label}</option>
                ))}
              </select>
            </div>}
          </div>
        </header>
        {(!mobile || openMenu) && (
          <aside className='d-flex flex-column bg-body border-right' style={{
            overflowY: 'auto',
            position: 'absolute',
            top: '100%',
            height: 'calc(100vh - 100%)',
            width: 200,
            marginLeft: left,
            ...menuContainerStyle,
          }}>
            <div className='d-flex flex-column absolute-fill'>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <SideMenu pages={pages} menuStyle={style.menuItem} themeColor={themeColor} />
              </div>
              {_.isFunction(onLogout) && (
                <Pressable onPress={onLogout}>
                  <div className='d-flex flex-nowrap ps-3 py-2 text-body'>
                    <StyleProvider components={{ text: { color: 'inherit', fontSize: theme.root.fontSize } }}>
                      <Icon icon='MaterialIcons' name='logout' />
                    </StyleProvider>
                    <span className='my-0 h6 ms-1'>{localization.string('logout')}</span>
                  </div>
                </Pressable>
              )}
            </div>
          </aside>
        )}
      </div>
      <div className='d-flex row flex-nowrap flex-fill' style={{ paddingLeft: left + (mobile ? 0 : 200) }}>
        <main className='d-flex flex-fill flex-column overflow-auto'>{children}</main>
      </div>
    </>
  );
};

export default Layout;