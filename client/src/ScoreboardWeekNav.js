import React from 'react';
import { Link } from 'react-router-dom';

class ScoreboardWeekNav extends React.Component {
  render() {
    return (
      <ul className='week-nav'>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=1'
            }}>
            Week 1
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=2'
            }}>
            Week 2
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=3'
            }}>
            Week 3
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=4'
            }}>
            Week 4
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=5'
            }}>
            Week 5
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=6'
            }}>
            Week 6
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=7'
            }}>
            Week 7
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=8'
            }}>
            Week 8
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=9'
            }}>
            Week 9
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=10'
            }}>
            Week 10
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=11'
            }}>
            Week 11
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=12'
            }}>
            Week 12
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/scoreboard',
              search: '?scoringPeriodId=13'
            }}>
            Week 13
          </Link>
        </li>
      </ul>
    )
  }
}

export default ScoreboardWeekNav;