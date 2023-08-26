//
//  index.js
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
import { StyleSheet } from 'react-native';
import { View, Text, tintColor } from '@o2ter/react-ui';
import cyrb53 from './cyb53';
import hsv2rgb from './hsv2rgb';

const style = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export const BrandDefaultLogo: React.FC<{
  name?: string;
}> = ({
  name
}) => {

  const rand = cyrb53(name ?? '') / cyrb53.MAX_VALUE;
  const color = hsv2rgb(rand, 1, 0.75);

  return (
    <View style={[style.container, { backgroundColor: tintColor(color, 0) }]}>
      <Text style={[style.text, { color: tintColor(color, 0.65) }]}>{_.first(name ?? '')?.toUpperCase()}</Text>
    </View>
  );
}

export default BrandDefaultLogo;