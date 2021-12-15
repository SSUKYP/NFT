import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Nft } from '../lib/api/types';
import NftCard from '../components/NftCard';

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
      spacing={3}
    >
      {!isEmpty ? (
        items.map((item, key) => (
          <Grid item key={key}>
            <NftCard nft={item} />
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
