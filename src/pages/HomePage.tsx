import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Nft } from '../lib/api/types';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getNftList } from '../lib/api/nft';
import ipfsToUrl from '../lib/ipfsToUrl';

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

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: true,
  };
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getNftList({
        take: '5',
        skip: '0',
        sortBy: 'likes',
      });
      setNfts(res.map(el => ({ ...el, image: ipfsToUrl(el.image) })));
    })();
  }, []);

  return (
    <Box sx={{ display: 'flex' }} fontFamily="CookieRun">
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
              {nfts.map(artist => (
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
                      image={artist.image}
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
                            {artist.creator.nickname}
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
                            {artist.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            gutterBottom
                            variant="overline"
                            display="block"
                          >
                            {artist.price} KLAY
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
                        component={Link}
                        to={{
                          pathname: '/details',
                          state: artist,
                        }}
                      >
                        <Typography variant="body2">
                          {artist.price !== 0 ? '구매하기' : '보러가기'}
                        </Typography>
                      </Button>
                      <Box sx={{ flexGrow: 8 }}></Box>
                      <Button
                        size="small"
                        startIcon={<FavoriteBorderIcon />}
                        sx={{ flexGrow: 1 }}
                        color="secondary"
                      >
                        {artist._count.likedUsers >= 100
                          ? '99+'
                          : artist._count.likedUsers}
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
            <Button
              component={Link}
              to="/market"
              variant="outlined"
              sx={{ mr: 2 }}
            >
              보러가기
            </Button>
            <Button component={Link} to="/add" variant="outlined">
              미술품 등록
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
