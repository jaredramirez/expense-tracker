// @flow
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import Table from '../components/Table';

storiesOf('Grid', module)
  .add('base', () => (
    <Table
      columns={columns}
      data={data}
      onRowClick={action('click')}
    />
  ));

const columns = [
  {
    header: 'Amount',
    accessor: 'amount',
  }, {
    header: 'Comment',
    accessor: 'comment',
  }, {
    header: 'Datetime',
    accessor: 'datetime',
  }, {
    header: 'Description',
    accessor: 'description',
  },
];
const data = [
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
  {
    amount: 1450,
    comment: 'comment',
    datetime: 1493441488,
    description: 'desc.',
  }, {
    datetime: 1493441488,
    description: 'desc. 2',
    amount: 450,
    comment: 'comment 2',
  },
];
