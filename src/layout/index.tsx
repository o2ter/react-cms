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
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SideMenu, PageItem } from './SideMenu';
import { BrandDefaultLogo } from './BrandDefaultLogo';
import { useTheme } from '../theme';
import { Icon, TextStyleProvider } from '@o2ter/react-ui';

import Localization from '../i18n/layout/SideMenu';
import { setPreferredLocale, useLocalize } from '@o2ter/i18n';

export { PageItem };

export const Layout: React.FC<React.PropsWithChildren<{
  pages: PageItem[];
  onLogout?: () => void;
  locales?: { locale: string; label: string; }[]
  brandIcon?: React.ReactNode;
  brandTitle?: string;
  LayoutBrandComponent?: React.ReactNode;
  menuContainerStyle?: React.CSSProperties;
}>> = ({
  pages,
  onLogout,
  locales = [],
  brandIcon,
  brandTitle,
  LayoutBrandComponent,
  menuContainerStyle,
  children
}) => {

  const localization = Localization.useLocalize();

  const theme = useTheme();

  const _color = theme.color ?? 'primary';
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

  const headerRef = React.useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);

  const localize = useLocalize();
  const currentLocale = localize(_.fromPairs(_.map(locales, ({ locale }) => [locale, locale])));

  React.useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver((entries) => setHeaderHeight(entries[0].target.clientHeight));
    observer.observe(headerRef.current);
    return () => void observer.disconnect();
  }, [headerRef.current]);

  return (
    <React.Fragment>
      <header ref={headerRef} className='navbar py-2 px-4 border-bottom bg-white fixed-top'>
        <div className='d-flex flex-row align-items-center w-100'>
          {_.isNil(LayoutBrandComponent) ? (
            <>
              {brandIcon ?? <BrandDefaultLogo name={brandTitle} />}
              <span className='h3 m-0 ms-3 col-auto me-auto'>{brandTitle}</span>
            </>
          ) : LayoutBrandComponent}
          <div className='col-auto'>
            {!_.isEmpty(locales) && <select className="form-select" onChange={(e) => { setPreferredLocale(e.target.value); }}>
              {_.map(locales, ({ locale, label }) => (
                currentLocale === locale ? <option selected value={locale}>{label}</option> : <option value={locale}>{label}</option>
              ))}
            </select>}
          </div>
        </div>
      </header>
      <div className='container-fluid p-0 mx-0 mb-0 row flex-nowrap flex-fill' style={{ marginTop: headerHeight }}>
        <aside className='d-flex flex-column p-0 border-end' style={{
          overflowY: 'auto',
          minHeight: '100%',
          width: 200,
          height: 0,
          ...menuContainerStyle,
        }}>
          <div className='position-fixed start-0 bottom-0' style={{
            width: 'inherit',
            top: headerHeight,
          }}>
            <div className='d-flex flex-column position-absolute top-0 start-0 bottom-0 end-0'>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <SideMenu pages={pages} menuStyle={style.menuItem} themeColor={themeColor} />
              </div>
              {_.isFunction(onLogout) && (
                <Pressable onPress={onLogout}>
                  <div className='d-flex flex-nowrap ps-3 py-2 text-body link-primary'>
                    <TextStyleProvider style={{ color: 'inherit', fontSize: theme.fontSizeBase }}>
                      <Icon icon='MaterialIcons' name='logout' />
                    </TextStyleProvider>
                    <span className='my-0 h6 ms-1'>{localization.string('logout')}</span>
                  </div>
                </Pressable>
              )}
            </div>
          </div>
        </aside>
        <main className='d-flex flex-fill p-0 overflow-auto'>{children}</main>
      </div>
    </React.Fragment>
  )
};

export default Layout;