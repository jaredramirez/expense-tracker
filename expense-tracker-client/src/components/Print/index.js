// @flow
import {css} from 'aphrodite';
import React, {Component} from 'react';
import Table from 'components/Table';

import type {Expense} from 'reducers/types';
import styles from './styles';

const style = {textAlign: 'center'};
const columns = [
  {
    header: 'Amount',
    accessor: 'amount',
    sortable: false,
    style,
  }, {
    header: 'Comment',
    accessor: 'comment',
    sortable: false,
    style,
  }, {
    header: 'Date',
    accessor: 'date',
    sortable: false,
    style,
  }, {
    header: 'Time',
    accessor: 'time',
    sortable: false,
    style,
  }, {
    header: 'Description',
    accessor: 'description',
    sortable: false,
    style,
  },
];

type Props = {
  location: {
    state: {
      weekString: string,
      weeks: Array<any>,
    },
  },
};

type State = {
  weeks: Array<Expense>,
  week: string,
  average: number,
  days: any,
};

class Print extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    const {location: {state: {weekString, weeks}}} = props;

    const initial = {
      total: 0,
      days: {
        [0]: {total: 0, count: 0},
        [1]: {total: 0, count: 0},
        [2]: {total: 0, count: 0},
        [3]: {total: 0, count: 0},
        [4]: {total: 0, count: 0},
        [5]: {total: 0, count: 0},
        [6]: {total: 0, count: 0},
      },
    };
    const {total, days} = weeks.reduce(
      (acc, expense) => {
        const date = new Date(expense.datetime);
        const day = date.getDay();
        const amount = parseInt(expense.amount, 10);
        return {
          total: (acc.total + amount),
          days: {
            ...acc.days,
            [day]: {
              total: acc.days[day].total + amount,
              count: acc.days[day].count + 1,
            },
          },
        };
      },
      initial,
    );

    this.state = {
      weeks,
      week: weekString,
      average: total / weeks.length,
      days,
    };
  }
  transformData = (): Array<Expense> => this.state.weeks.map((expense) => {
    const date = new Date(expense.datetime);
    return {
      ...expense,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  });
  getDayString = (day: string) => {
    if (day === '0') {
      return 'Sunday';
    } else if (day === '1') {
      return 'Monday';
    } else if (day === '2') {
      return 'Tuesday';
    } else if (day === '3') {
      return 'Wednesday';
    } else if (day === '4') {
      return 'Thursday';
    } else if (day === '5') {
      return 'Friday';
    }
    return 'Saturday';
  }
  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.averages)}>
          <span className={css(styles.placeholder)} />
          <span className={css(styles.header)}>
            Week: {this.state.week}
          </span>
          <span className={css(styles.item)}>
            Overall Average: ${this.state.average}
          </span>
          {
            Object.keys(this.state.days).map(day => (
              <span key={day} className={css(styles.item)}>
                Average for {this.getDayString(day)}: $
                {
                  this.state.days[day].count > 0
                    ? this.state.days[day].total / this.state.days[day].count
                    : 0
                }
              </span>
            ))
          }
          <span className={css(styles.placeholder)} />
        </div>
        <div className={css(styles.table)}>
          <Table
            columns={columns}
            data={this.transformData()}
          />
        </div>
      </div>
    );
  }
}

export default Print;
