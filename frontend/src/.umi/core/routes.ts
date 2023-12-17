// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/weifanwu/Desktop/UWise-Course-Review/frontend/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/courseInfo",
    "component": require('@/layouts/index').default,
    "routes": [
      {
        "path": "/courseInfo/detail",
        "component": require('@/pages/courseInfoPage/index').default,
        "exact": true
      },
      {
        "path": "/courseInfo/QA",
        "component": require('@/pages/QAPage/QAPage.tsx').default,
        "exact": true
      }
    ]
  },
  {
    "path": "/",
    "component": require('@/pages/index').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
