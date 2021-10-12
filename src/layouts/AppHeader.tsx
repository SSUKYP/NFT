import {
  alpha,
  AppBar,
  Box,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

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
  return (
    <AppBar position="relative">
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
            component={Link}
            to="/account"
            size="large"
            edge="end"
            aria-label="account of current user"
            //aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
