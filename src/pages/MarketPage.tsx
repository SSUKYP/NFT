import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SidebarAccordion } from './SidebarAccordion';
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
import { useState, useEffect } from 'react';
import { Nft } from '../lib/api/types';
import { getNftList, toggleNftLike } from '../lib/api/nft';
import ipfsToUrl from '../lib/ipfsToUrl';
import { useSnackbar } from 'notistack';
import { useUserState } from '../atoms/authState';
import { getUser } from '../lib/api/user';
import FavoriteIcon from '@mui/icons-material/Favorite';

function MarketPage() {
  const [filterButtonShow, setFilterButtonShow] =
    React.useState<string>('none');
  const [buttonNames, setButtonNames] = React.useState<Array<string>>([]);
  const [nfts, setNfts] = useState<Nft[]>([]);
  const userState = useUserState();
  const [userId, setUserId] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await getNftList({
        take: '10',
      });
      setNfts(res.map(el => ({ ...el, image: ipfsToUrl(el.image) })));
    })();
    (async () => {
      if (userState) {
        const user = await getUser(userState.walletAddress);
        setUserId(user.id);
      }
    })();
  }, [userState, toggle]);

  const handleFilterButton = (
    event: React.SyntheticEvent,
    filterName: string
  ) => {
    event.preventDefault();
    if (buttonNames.includes(filterName)) return;

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

  const handleToggleClick = async (
    event: React.SyntheticEvent,
    value: number
  ) => {
    event.preventDefault();

    if (!userState) {
      enqueueSnackbar('로그인 먼저 해주세요.', { variant: 'error' });
      return;
    }

    toggleNftLike(value);
    const res = await getNftList({
      take: '5',
      skip: '0',
      sortBy: 'likes',
    });

    setNfts([...res.map((el: Nft) => ({ ...el, image: ipfsToUrl(el.image) }))]);

    setToggle(value => value + 1);
  };

  return (
    <Box sx={{ display: 'flex' }} fontFamily="NotoSans">
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
          {nfts
            .filter(artist => {
              if (buttonNames.length == 0) return true;
              else
                return (
                  buttonNames.includes(
                    artist.price === 0 ? '판매완료' : '판매중'
                  ) || buttonNames.includes(artist.creator.nickname)
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
                    image={artist.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0} rowSpacing={0}>
                      <Grid item xs={8}>
                        <Typography
                          gutterBottom
                          variant="body2"
                          display="block"
                          color="text.secondary"
                        >
                          {artist.creator.nickname}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          gutterBottom
                          variant="body2"
                          display="block"
                        >
                          가격
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="h2"
                          display="block"
                        >
                          {artist.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          gutterBottom
                          variant="body2"
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
                      sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                      }}
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
                      startIcon={
                        userState && artist.likedUserIDs.includes(userId) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
                      sx={{ flexGrow: 1 }}
                      color="secondary"
                      onClick={event =>
                        handleToggleClick(event, +event.currentTarget.value)
                      }
                      value={artist.tokenId}
                    >
                      {artist._count.likedUsers >= 100
                        ? '99+'
                        : artist._count.likedUsers}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MarketPage;
