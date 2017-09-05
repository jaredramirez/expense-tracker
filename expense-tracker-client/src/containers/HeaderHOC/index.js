// @flow
import React from 'react';

import Header from 'containers/Header';

const HeaderHOC = (Component: any) => (props: any) => (
  <Header history={props.history} match={props.match}>
    <Component {...props} />
  </Header>
);

export default HeaderHOC;
