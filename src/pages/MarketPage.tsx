import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SidebarAccordion } from './SidebarAccordion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';

const artists = [
  {
    id: 1,
    artist: 'Vincent Van Gogh',
    title: '별이 빛나는 밤',
    img: 'assets/Starry_Night.jpg',
    price: 0.009,
    like: 10,
    isSold: true,
  },
  {
    id: 2,
    artist: 'Leonardo Da Vinci',
    title: '모나리자',
    img: 'assets/Mona_Lisa.jpg',
    price: 0.01,
    like: 10,
    isSold: true,
  },
  {
    id: 3,
    artist: 'Claude Monet',
    title: '인상, 해돋이',
    img: 'assets/Impression_Sunrise.jpg',
    price: 0.022,
    like: 1,
    isSold: false,
  },
  {
    id: 4,
    artist: '백남준',
    title: '다다익선',
    img: 'assets/dadaikseon.jpg',
    price: 0.014,
    like: 100,
    isSold: true,
  },
  {
    id: 5,
    artist: 'Edvard Munch',
    title: '절규',
    img: 'assets/The_Scream.jpg',
    price: 0.05,
    like: 100,
    isSold: false,
  },
  {
    id: 6,
    artist: 'PRguitarman',
    title: 'POP TART CAT',
    img: 'assets/poptartcat.gif',
    price: 0.02,
    like: 20,
    isSold: true,
  },
  {
    id: 7,
    artist: 'Salvador Dali',
    title: '기억의 지속',
    img: 'assets/Clock.jpg',
    price: 0.01,
    like: 30,
    isSold: true,
  },
  {
    id: 8,
    artist: '안견',
    title: '몽유도원도',
    img: 'assets/mongyou.jpg',
    price: 0.093,
    like: 90,
    isSold: false,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: 'NotoSans',
  },
});

function MarketPage() {
  const [filterButtonShow, setFilterButtonShow] =
    React.useState<string>('none');
  const [buttonNames, setButtonNames] = React.useState<Array<string>>([]);

  const handleFilterButton = (
    event: React.SyntheticEvent,
    filterName: string
  ) => {
    event.preventDefault();
    setFilterButtonShow('flex');

    setButtonNames(prevButtonNames => [...prevButtonNames, filterName]);
  };

  const handleRemoveFilterClick = (
    event: React.SyntheticEvent,
    filterName: string
  ) => {
    event.preventDefault();

    setButtonNames(prevButtonNames =>
      prevButtonNames.filter(buttonNames => buttonNames !== filterName)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: '20vw',
            height: '100vh',
            display: 'flex',
            position: 'relative',
            '& .MuiDrawer-paper': {
              width: '20vw',
              height: '100vh',
              boxSizing: 'border-box',
              position: 'relative',
            },
          }}
          variant="permanent"
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <SidebarAccordion onShow={handleFilterButton} />
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: 'whitesmoke',
          }}
        >
          <ButtonGroup
            sx={{
              display: filterButtonShow,
            }}
          >
            {buttonNames.map(buttonName => (
              <Button
                key={buttonName}
                sx={{ mb: 3 }}
                endIcon={<ClearIcon />}
                onClick={(event: React.SyntheticEvent) =>
                  handleRemoveFilterClick(event, buttonName)
                }
              >
                {buttonName}
              </Button>
            ))}
          </ButtonGroup>
          <Grid container spacing={4}>
            {artists
              .filter(artist => {
                if (buttonNames.length == 0) return true;
                else
                  return (
                    buttonNames.includes(artist.artist) ||
                    buttonNames.includes(artist.isSold ? '판매완료' : '판매중')
                  );
              })
              .map(artist => (
                <Grid item key={artist.id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="280"
                      image={artist.img}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0} rowSpacing={0}>
                        <Grid item xs={8}>
                          <Typography
                            gutterBottom
                            variant="overline"
                            display="block"
                            color="text.secondary"
                          >
                            {artist.artist}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            gutterBottom
                            variant="overline"
                            display="block"
                          >
                            가격
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            gutterBottom
                            variant="overline"
                            component="h2"
                            display="block"
                          >
                            {artist.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            gutterBottom
                            variant="overline"
                            display="block"
                          >
                            {artist.price} GAS
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions
                      sx={{
                        height: '42',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          flexGrow: 1,
                          display: artist.isSold ? 'none' : 'block',
                          textAlign: 'center',
                        }}
                        component={Link}
                        to={{
                          pathname: '/details',
                          state: { Nft: artist },
                        }}
                      >
                        구매하기
                      </Button>
                      <Box sx={{ flexGrow: 8 }}></Box>
                      <Button
                        size="small"
                        startIcon={<FavoriteBorderIcon />}
                        sx={{ flexGrow: 1 }}
                        color="secondary"
                      >
                        {artist.like >= 100 ? '99+' : artist.like}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MarketPage;
