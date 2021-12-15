import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { Nft } from '../lib/api/types';
import Carousel from 'react-material-ui-carousel';
import { getNftList } from '../lib/api/nft';
import ipfsToUrl from '../lib/ipfsToUrl';
import NftCard from '../components/NftCard';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FunctionComponent = () => {
  const [nfts, setNfts] = useState<Nft[]>(null);

  useEffect(() => {
    (async () => {
      const res = await getNftList({
        take: '6',
        skip: '0',
        sortBy: 'likes',
      });

      setNfts([
        ...res.map((el: Nft) => ({ ...el, image: ipfsToUrl(el.image) })),
      ]);
    })();
  }, []);

  return (
    <Box fontFamily="CookieRun" p={3} maxWidth="lg" margin="auto">
      <Stack justifyContent="center" alignItems="center" spacing={5}>
        <Box>
          <Typography variant="h2" component="h2">
            KlaySea에 오신 걸 환영합니다.
          </Typography>
        </Box>

        <Box width="100%">
          <Carousel animation="slide" navButtonsAlwaysVisible={true}>
            {nfts &&
              [...new Array(2)].map((_, idx) => (
                <Stack
                  key={idx}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <NftCard nft={nfts[idx * 3]} />
                  <NftCard nft={nfts[idx * 3 + 1]} />
                  <NftCard nft={nfts[idx * 3 + 2]} />
                </Stack>
              ))}
          </Carousel>
        </Box>

        <Box>
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
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
