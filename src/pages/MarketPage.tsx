/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
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
    title:'모나리자',
    price: 0.0010,
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
    price: 0.0020,
    like: 20,
    isSold: true,
  }, 
  {
    id: 7,
    artist: 'Kotaro',
    title: 'fight',
    price: 0.0010,
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
  }
];

const theme = createTheme({});

function MarketPlace() {
  const [filterButtonShow, setFilterButtonShow] = React.useState<string>('none');
  const [buttonNames, setButtonNames] = React.useState<Array<string>>([]);

  const handleFilterButton = (event: React.SyntheticEvent, filterName: string) => {
    event.preventDefault();
    setFilterButtonShow('flex');

    setButtonNames(prevButtonNames => [...prevButtonNames, filterName]);
  }

  const handleRemoveFilterClick = (event: React.SyntheticEvent, filterName: string) => {
    event.preventDefault();

    setButtonNames(prevButtonNames => prevButtonNames.filter(buttonNames => buttonNames !== filterName));
  }

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{display:'flex'}}>
          <CssBaseline />
          <Drawer 
          sx={{
            width: '20vw',
            height: '100vh',
            display: 'flex',
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: '20vw',
              boxSizing: 'border-box' 
            },
          }}
          anchor="left"
          variant="permanent">
            <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}>
            </Toolbar>
            <SidebarAccordion onShow={handleFilterButton}/>
          </Drawer>
          <Box component='main'
            sx={{
              flexGrow: 1,
              p: 3,
              overflow: 'auto',
              backgroundColor: 'whitesmoke'
            }}>
              <ButtonGroup sx={{
                display: filterButtonShow
              }}>
                {buttonNames.map((buttonName) =>
                  <Button 
                  key={buttonName} 
                  sx={{mb: 3}} 
                  endIcon={<ClearIcon />} 
                  onClick={(event: React.SyntheticEvent) => handleRemoveFilterClick(event, buttonName)}>{buttonName}</Button> 
                )}
              </ButtonGroup>
              <Grid container spacing={4}>
                {artists.filter((artist) => {
                  if(buttonNames.length == 0) 
                    return true;
                  else 
                    return buttonNames.includes(artist.artist);
                }).map((artist) => (
                  <Grid item key={artist.id} xs={12} sm={6} md={3}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                            <Typography gutterBottom variant="overline" display="block" color="text.secondary">
                              {artist.artist}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography gutterBottom variant="overline" display="block">
                              가격
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography gutterBottom variant="overline" component="h2" display="block">
                              {artist.title}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography gutterBottom variant="overline" display="block">
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
                        flexDirection: 'row'
                      }}>
                        <Button size="small" variant="contained" sx={{flexGrow:1}}>구매하기</Button>
                        <Box sx={{flexGrow: 8}}></Box>
                        <Button size="small" startIcon={<FavoriteBorderIcon /> } sx={{flexGrow:1}} color="secondary">
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

export default MarketPlace;