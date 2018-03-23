import React from 'react';

function Nav () {
  return (
    <ul className='nav'>
      <li>
        <a href='/'>
          Standings
        </a>
      </li>
      <li>
        <a href='/rankings?scoringPeriodId=13'>
          Rankings
        </a>
      </li>
      <li>
        <a href='/scoreboard?scoringPeriodId=13'>
          Scoreboard
        </a>
      </li>
    </ul>
  )
}

export default Nav;