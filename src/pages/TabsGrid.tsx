import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import MarketPage from './MarketPage';
import { Link } from 'react-router-dom';
import StarryNight from '../assets/Starry_Night.jpg';
import MonaLisa from '../assets/Mona_Lisa.jpg';
import PopTartCat from '../assets/poptartcat.gif';
import Clock from '../assets/Clock.jpg';
import Mongyou from '../assets/mongyou.jpg';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useSnackbar } from 'notistack';

const collectedItems = [
  {
    id: 1,
    artist: 'Vincent Van Gogh',
    title: '별이 빛나는 밤',
    img: StarryNight,
    price: 0.009,
    like: 10,
    isSold: true,
  },
  {
    id: 2,
    artist: 'Leonardo Da Vinci',
    title: '모나리자',
    img: MonaLisa,
    price: 0.01,
    like: 10,
    isSold: true,
  },
];

const createdItems: {
  id: number;
  artist: string;
  title: string;
  img: string;
  price: number;
  like: number;
  isSold: boolean;
}[] = [];

const lovedItems = [
  {
    id: 0,
    artist: 'PRguitarman',
    title: 'POP TART CAT',
    img: PopTartCat,
    price: 0.02,
    like: 20,
    isSold: true,
  },
  {
    id: 1,
    artist: 'Salvador Dali',
    title: '기억의 지속',
    img: Clock,
    price: 0.01,
    like: 30,
    isSold: true,
  },
  {
    id: 2,
    artist: '안견',
    title: '몽유도원도',
    img: Mongyou,
    price: 0.093,
    like: 90,
    isSold: false,
  },
];

interface TabGridMode {
  tabs: string;
}

const TabsGrid: React.FunctionComponent<TabGridMode> = props => {
  const tabs = props.tabs;
  const items =
    tabs === 'collected'
      ? collectedItems
      : tabs === 'created'
      ? createdItems
      : lovedItems;
  const isEmpty = items.length === 0;
  const [open, setOpen] = useState(false);
  const [sell, setSell] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSell(event.target.checked);
  };

  const handleDialogOpenClick = () => {
    setOpen(true);
  };

  const handleSellClick = () => {
    const alert = sell ? '판매중으로 바꿉니다.' : '판매중단으로 바꿉니다.';
    enqueueSnackbar(alert, { variant: 'info' });
    setOpen(false);
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        background: '#FDF6F0',
        border: 2,
        borderRadius: 6,
        borderColor: '#F8E2CF',
        mt: 2,
        minHeight: '300px',
        minWidth: '800px',
        maxWidth: '1200px',
      }}
    >
      {!isEmpty ? (
        items.map((item, key) => (
          <React.Fragment key={key}>
            <Grid item xs={12} sm={6} md={3} sx={{ m: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  mr: 2,
                  background: '#FCD8D4',
                }}
              >
                <CardMedia component="img" height="280" image={item.img} />
                <CardActionArea LinkComponent={MarketPage}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0} rowSpacing={0}>
                      <Grid item xs={8}>
                        <Typography
                          gutterBottom
                          variant="overline"
                          display="block"
                          color="text.secondary"
                        >
                          {item.artist}
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
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          gutterBottom
                          variant="overline"
                          display="block"
                        >
                          {item.price}GAS
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
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
                      pathname: `/details/${item.title}`,
                      state: { Nft: item },
                    }}
                  >
                    <Typography variant="body2">
                      {!item.isSold ? '구매하기' : '보러가기'}
                    </Typography>
                  </Button>
                  {tabs === 'collected' ? (
                    <>
                      <Box sx={{ flexGrow: 8 }}></Box>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ flexGrow: 1, textAlign: 'center' }}
                        onClick={handleDialogOpenClick}
                      >
                        <Typography variant="body2">{`판매여부`}</Typography>
                      </Button>
                    </>
                  ) : (
                    <> </>
                  )}
                  <Box sx={{ flexGrow: 8 }}></Box>
                  <Button
                    size="small"
                    startIcon={<FavoriteBorderIcon />}
                    sx={{ flexGrow: 1 }}
                    color="secondary"
                  >
                    {item.like >= 100 ? '99+' : item.like}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{`미술품의 상태 변경`}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {`판매 혹은 판매하지 않음으로 선택할 수 있습니다.`}
                </DialogContentText>
                <FormControlLabel
                  sx={{ mt: 2 }}
                  control={
                    <Switch checked={sell} onChange={handleSellChange} />
                  }
                  label={
                    sell ? (
                      <Typography variant="body2">판매중</Typography>
                    ) : (
                      <Typography variant="body2">판매중단</Typography>
                    )
                  }
                />
                <DialogActions>
                  <Button
                    sx={{
                      flexDirection: 'column-reverse',
                      width: '50%',
                    }}
                    variant="outlined"
                    onClick={handleSellClick}
                  >
                    확인
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        ))
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>Nothing To Show</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default TabsGrid;
