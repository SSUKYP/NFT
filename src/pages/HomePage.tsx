import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const artists = [
  {
    id: 1,
    artist: '양준혁',
    title: '별이 빛나는 밤',
    price: 0.0009,
    like: 10,
    isSold: true,
  },
  {
    id: 2,
    artist: '김지수',
    title: '모나리자',
    price: 0.001,
    like: 10,
    isSold: true,
  },
  {
    id: 3,
    artist: '박수민',
    title: '해바라기',
    price: 0.0001,
    like: 1,
    isSold: false,
  },
  {
    id: 4,
    artist: 'Kant',
    title: '시간표',
    price: 0.0014,
    like: 100,
    isSold: true,
  },
  {
    id: 5,
    artist: 'BenTham',
    title: '파놉티콘',
    price: 0.005,
    like: 100,
    isSold: false,
  },
  {
    id: 6,
    artist: 'Mill',
    title: '자유론',
    price: 0.002,
    like: 20,
    isSold: true,
  },
  {
    id: 7,
    artist: 'Kotaro',
    title: 'fight',
    price: 0.001,
    like: 30,
    isSold: true,
  },
  {
    id: 8,
    artist: '정성하',
    title: 'finger',
    price: 0.0093,
    like: 90,
    isSold: false,
  },
];

const Slider = styled(SlickSlider)`
  .slick-slide {
    width: 7% !important;
    height: 45vh;
    margin: 0 auto;
  }
  .slick-list {
    width: 70%;
    margin: 0px auto;
  }
  .slick-prev {
    left: 3% !important;
    z-index: 1;
    background: AliceBlue;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
    background: AliceBlue;
  }
  .slick-prev:before {
    content: '<';
    color: black;
    font-size: 15px;
  }
  .slick-next:before {
    content: '>';
    color: black;
    font-size: 15px;
  }
`;

const theme = createTheme({
  palette: {
    background: {
      default: 'AliceBlue',
    },
  },
});

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: true,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Grid
          container
          spacing={4}
          sx={{ mt: 3, alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant="h2" component="h2">
                KlaySea에 오신 걸 환영합니다.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="overline" component="div">
                MOST LOVED ARTS
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Slider {...settings}>
                {artists
                  .filter(artist => artist.like > 10)
                  .map(artist => (
                    <div key={artist.id}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          ml: 10,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="280"
                          image="https://source.unsplash.com/random"
                          alt="random"
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
                            sx={{ flexGrow: 1 }}
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
                    </div>
                  ))}
              </Slider>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Button component={Link} to="/market" variant="outlined">
                보러가기
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
