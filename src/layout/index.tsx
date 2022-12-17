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
import { StyleSheet } from 'react-native';
import { SideMenu, PageItem } from './SideMenu';
import { BrandDefaultLogo } from './BrandDefaultLogo';
import { useTheme } from '../theme';

export { PageItem };

export const Layout: React.FC<React.PropsWithChildren<{
  pages: PageItem[];
}>> = ({
  pages,
  children
}) => {

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

  React.useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver((entries) => setHeaderHeight(entries[0].target.clientHeight));
    observer.observe(headerRef.current);
    return () => { observer.disconnect(); }
  }, [headerRef.current]);

  return (
    <React.Fragment>
      <header ref={headerRef} className='navbar py-2 px-4 border-bottom bg-white fixed-top'>
        <div className='d-flex flex-row align-items-center'>
          {theme.brandIcon ?? <BrandDefaultLogo name={theme.brandTitle} />}
          <span className='h3 m-0 ms-3'>{theme.brandTitle}</span>
        </div>
      </header>
      <div className='container-fluid p-0 mx-0 mb-0 row flex-nowrap flex-fill' style={{ marginTop: headerHeight }}>
        <aside className='d-flex flex-column col-4 col-md-3 col-lg-2 p-0 border-end' style={{
          overflowY: 'auto',
          minHeight: '100%',
          height: 0,
        }}>
          <SideMenu pages={pages} menuStyle={style.menuItem} themeColor={themeColor} />
        </aside>
        <main className='d-flex flex-fill p-0'>{children}</main>
      </div>
    </React.Fragment>
  )
};

export default Layout;