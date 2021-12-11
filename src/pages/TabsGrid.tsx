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
import { Nft } from '../lib/api/types';
import ipfsToUrl from '../lib/ipfsToUrl';
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

interface TabGridMode {
  tabs: string;
  ownedNfts: Nft[];
  createdNfts: Nft[];
  likedNfts: Nft[];
}

const TabsGrid: React.FunctionComponent<TabGridMode> = ({
  tabs,
  ownedNfts,
  likedNfts,
  createdNfts,
}) => {
  const items =
    tabs === 'collected'
      ? ownedNfts
      : tabs === 'created'
      ? createdNfts
      : likedNfts;
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

  const handleSellClick = async (
    event: React.SyntheticEvent,
    item: number | string
  ) => {
    event.preventDefault();
    const alert = sell ? '판매중으로 바꿉니다.' : '판매중단으로 바꿉니다.';
    enqueueSnackbar(alert, { variant: 'info' });
    setOpen(false);

    const nftBlock = await window.caver.rpc.klay.getBlockByNumber(item);
    const transaction = nftBlock.transactions[0];
    const tx = window.caver.transaction.valueTransfer.create({
      from: transaction.from,
      to: transaction.to,
      value: window.caver.utils.convertToPeb(0, 'KLAY'),
      gas: 200000,
    });

    window.caver.klay.sendTransaction(tx).then(console.log);
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
                <CardMedia
                  component="img"
                  height="280"
                  image={ipfsToUrl(item.image)}
                />
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
                          {item.creator.nickname}
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
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          gutterBottom
                          variant="overline"
                          display="block"
                        >
                          {item.price}KLAY
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
                      pathname: `/details/${item.name}`,
                      state: { Nft: item },
                    }}
                  >
                    <Typography variant="body2">
                      {item.price !== 0 ? '구매하기' : '보러가기'}
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
                    {item._count.likedUsers >= 100
                      ? '99+'
                      : item._count.likedUsers}
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
                    onClick={event => handleSellClick(event, item.id)}
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
