import { IconButton, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { history } from '_helpers';

import { Brightness3, WbSunny } from '@material-ui/icons';

import { accountService, baseUrl } from '_services';
import API from '_helpers/api-helpers';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  spacing: {
    marginTop: '50px',
  },
  barnav: {
    display: `flex`,
    justifyContent: `space-`,
  },
  button: {
    color: 'orange',
  },
});

function Nav({ changeTheme, isDark }) {
  const [admin, setAdmin] = useState(false);
  const classes = useStyles();
  const [account, setAccount] = useState(null);
  useEffect(() => {
    accountService.account.subscribe((x) => setAccount(x));
  }, []);

  const handleCreatePostClick = async () => {
    const post = await accountService.createPost();
    history.push({
      pathname: `/posts/${post.id}/edit`,
      state: { from: history.location.state },
    });
  };

  const handleToggleAdmin = async () => {
    try {
      await API.get(`${baseUrl}/toggle/${accountService.accountValue.id}`);
      setAdmin((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <div className='navbar-nav barnav'>
        <NavLink className='btn btn-link nav-item nav-link' to='/'>
          Home
        </NavLink>
        {admin && account && (
          <button
            type='button'
            className='btn btn-link nav-item nav-link'
            onClick={handleCreatePostClick}>
            Create Post
          </button>
        )}

        {account && (
          <button
            type='button'
            className='btn btn-link nav-item nav-link'
            onClick={handleToggleAdmin}>
            Admin Mode?
          </button>
        )}

        {account && (
          <button
            type='button'
            className='btn btn-link nav-item nav-link'
            onClick={accountService.logout}>
            Logout
          </button>
        )}

        <div>
          <IconButton aria-label='dark' onClick={changeTheme}>
            {isDark ? <Brightness3 /> : <WbSunny className={classes.button} />}
          </IconButton>
        </div>
        {!account && (
          <button type='button' className='btn btn-facebook' onClick={accountService.login}>
            <i className='fa fa-facebook mr-1' />
            Login with Facebook
          </button>
        )}
      </div>
    </nav>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { Nav };
