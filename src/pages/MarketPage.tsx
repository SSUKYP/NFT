import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SidebarAccordion } from './SidebarAccordion';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEffect, useState } from 'react';
import { Nft } from '../lib/api/types';
import NftCard from '../components/NftCard';
import { getNftList } from '../lib/api/nft';

function MarketPage() {
  const [filterButtonShow, setFilterButtonShow] =
    React.useState<string>('none');
  const [buttonNames, setButtonNames] = React.useState<Array<string>>([]);
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getNftList({
        sortBy: 'likes',
      });
      setNfts(res);
    })();
  }, []);

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

  return (
    <Box sx={{ display: 'flex' }} fontFamily="NotoSans">
      <Drawer
        variant="permanent"
        sx={{
          marginLeft: 'auto',
          minHeight: '1vh',
          width: '18rem',
          zIndex: 9,
          '& .MuiDrawer-paper': {
            minHeight: '1vh',
            width: '18rem',
            position: 'absolute',
            transition: 'none !important',
          },
          '& .MuiBackdrop-root': {
            display: 'none',
          },
        }}
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
        <Grid container justifyContent="center" spacing={3}>
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
              <Grid item key={artist.id}>
                <NftCard nft={artist} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MarketPage;
