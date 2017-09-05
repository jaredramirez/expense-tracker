// @flow
import React from 'react';
import {connect} from 'react-redux';

import type {State} from 'reducers/types';

type Props = {
  // router
  match: {
    params: {
      userId: string,
    },
  },

  // redux
  authId: string,
};


const UserEditHOC = (AuthUserEdit: any, UserEdit: any) => {
  const Wrapper = (props: Props) => {
    const {authId, ...rest} = props;
    return (
      props.match.params.userId === authId
        ? <AuthUserEdit {...rest} /> : <UserEdit {...rest} />
    );
  };
  const mapStateToProps = ({auth: {user}}: State) => ({authId: user.id});
  const ConnectedWrapper = connect(mapStateToProps)(Wrapper);

  return ConnectedWrapper;
};

export default UserEditHOC;
