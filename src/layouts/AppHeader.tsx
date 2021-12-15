import {
  alpha,
  AppBar,
  Box,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import useAuth, { useUserState } from '../atoms/authState';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AppHeader() {
  const user = useUserState();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = useCallback(() => {
    handleClose();
    logout();
  }, [logout]);

  return (
    <AppBar position="relative" sx={{ zIndex: 10 }}>
      <Toolbar>
        <BubbleChartRoundedIcon sx={{ mr: 2 }} />
        <Typography
          component={Link}
          to="/"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            textDecoration: 'none',
          }}
        >
          KLAYsea
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            //aria-controls={menuId}
            color="inherit"
            onClick={handleClick}
            id="profile-button"
            aria-controls="profile-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
          >
            {user ? (
              <>
                <MenuItem onClick={handleClose} component={Link} to="/account">
                  프로필
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/add">
                  미술품 등록
                </MenuItem>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleClose} component={Link} to="/login">
                로그인
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
