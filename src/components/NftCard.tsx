import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useUserState } from '../atoms/authState';
import { Nft } from '../lib/api/types';
import { toggleNftLike } from '../lib/api/nft';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import ipfsToUrl from '../lib/ipfsToUrl';
import SellDialog from './SellDialog';

type NftCardProps = {
  nft: Nft;
};
export default function NftCard({ nft }: NftCardProps) {
  const user = useUserState();
  const { enqueueSnackbar } = useSnackbar();
  const [likes, setLikes] = useState(nft.likedUserIDs);
  const likeCount = useMemo(() => likes.length, [likes]);
  const [price, setPrice] = useState(nft.price);
  const [open, setOpen] = useState(false);

  const handleToggleClick = useCallback(async () => {
    if (!user) {
      enqueueSnackbar('로그인 먼저 해주세요.', { variant: 'error' });
      return;
    }

    const { likedUserIDs } = await toggleNftLike(nft.tokenId);
    setLikes(likedUserIDs);
  }, [enqueueSnackbar, nft.tokenId, user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpenClick = () => {
    setOpen(true);
  };

  const handleChange = async (newPrice: number) => {
    setOpen(false);
    try {
      if (nft.price === newPrice) {
        return;
      }
      if (newPrice > 0) {
        await window.ksea.methods
          .allowBuy(nft.tokenId, caver.utils.convertToPeb(newPrice, 'KLAY'))
          .send({
            from: window.klaytn.selectedAddress,
            gas: '2000000',
          });
        nft.price = newPrice;
        setPrice(newPrice);
      }
    } catch (err) {
      console.log(err.message);
    }
    return;
  };

  return (
    <Card
      sx={{
        width: '18rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia component="img" height="280" image={ipfsToUrl(nft.image)} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} rowSpacing={0}>
          <Grid item xs={8}>
            <Typography
              gutterBottom
              variant="body2"
              display="block"
              color="text.secondary"
            >
              {nft.creator.nickname ?? 'Unnamed'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography gutterBottom variant="body2" display="block">
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
              {nft.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography gutterBottom variant="body2" display="block">
              {price} KLAY
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
            state: nft,
          }}
        >
          <Typography variant="body2">
            {price !== 0 ? '구매하기' : '보러가기'}
          </Typography>
        </Button>

        {nft.ownerId === user?.sub && (
          <>
            <Box sx={{ flexGrow: 8 }}></Box>

            <Button
              size="small"
              variant="contained"
              sx={{ flexGrow: 1, textAlign: 'center' }}
              onClick={handleDialogOpenClick}
            >
              <Typography variant="body2">{`판매설정`}</Typography>
            </Button>

            <SellDialog
              open={open}
              price={price}
              onClose={handleClose}
              onChange={handleChange}
            />
          </>
        )}

        <Box sx={{ flexGrow: 8 }}></Box>

        <Button
          size="small"
          startIcon={
            user && likes.includes(user.sub) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )
          }
          sx={{ flexGrow: 1 }}
          color="secondary"
          value={nft.tokenId}
          onClick={handleToggleClick}
        >
          {likeCount >= 100 ? '99+' : likeCount}
        </Button>
      </CardActions>
    </Card>
  );
}
