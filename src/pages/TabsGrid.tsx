import React from 'react';
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
          <Grid item key={key} xs={12} sm={6} md={3} sx={{ m: 3 }}>
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
                    display: item.price === 0 ? 'none' : 'block',
                    textAlign: 'center',
                  }}
                  component={Link}
                  to={{
                    pathname: `/details/${item.id}`,
                    state: item,
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
                  {item._count.likedUsers >= 100
                    ? '99+'
                    : item._count.likedUsers}
                </Button>
              </CardActions>
            </Card>
          </Grid>
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
