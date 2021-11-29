import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import GridOnIcon from '@mui/icons-material/GridOnTwoTone';
import FormatPaintIcon from '@mui/icons-material/FormatPaintTwoTone';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import Divider from '@mui/material/Divider';
import TabsGrid from './TabsGrid';
import { useUserState } from '../atoms/authState';
import { getUser } from '../lib/api/user';
import { User } from '../lib/api/types';

export default function AccountPage() {
  const [tabs, setTabs] = React.useState<string>('collected');
  const { walletAddress } = useUserState();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    (async () => {
      const res = await getUser(walletAddress);
      setUser(res);
    })();
  }, [walletAddress]);

  const handleTabClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newTab = event.currentTarget.id;
    if (newTab === tabs) return;

    setTabs(newTab);
  };

  return (
    <Box>
      {user && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: 'white',
            }}
          >
            <Grid container spacing={0} rowSpacing={4} sx={{ mt: 3 }}>
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  background: 'white',
                }}
              >
                <Avatar
                  src="https://storage.googleapis.com/opensea-static/opensea-profile/13.png"
                  alt="default image"
                  variant="rounded"
                  sx={{
                    width: 126,
                    height: 126,
                  }}
                >
                  UNNAMED
                </Avatar>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'white',
                }}
              >
                <Typography variant="h3" component="h3" color="primary">
                  {user.username ?? 'Unnamed'}
                </Typography>
                <CopyToClipboard text={user.walletAddress}>
                  <Tooltip
                    title={'복사하기'}
                    placement="top"
                    TransitionComponent={Zoom}
                  >
                    <ButtonBase disableRipple>
                      <i className="walletAddress" />
                      <Typography
                        variant="overline"
                        component="span"
                        color="#F08080"
                      >
                        {user.walletAddress}
                      </Typography>
                    </ButtonBase>
                  </Tooltip>
                </CopyToClipboard>
                <Typography component="p" color="#6f6558">
                  Joined {user.createdAt}
                </Typography>
              </Grid>
              <Grid
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  background: 'white',
                  mt: 3,
                }}
              >
                <Button
                  startIcon={<GridOnIcon />}
                  size="large"
                  sx={{
                    flexGrow: 1,
                    borderBottom: tabs === 'collected' ? '3px solid black' : '',
                  }}
                  onClick={handleTabClick}
                  id="collected"
                >
                  컬렉션 {user._count.ownedNfts}
                </Button>
                <Button
                  startIcon={<FormatPaintIcon />}
                  size="large"
                  sx={{
                    flexGrow: 1,
                    borderBottom: tabs === 'created' ? '3px solid black' : '',
                  }}
                  onClick={handleTabClick}
                  id="created"
                >
                  만든 작품들 {user._count.createdNfts}
                </Button>
                <Button
                  startIcon={<FavoriteBorderIcon />}
                  size="large"
                  sx={{
                    flexGrow: 1,
                    borderBottom: tabs === 'loved' ? '3px solid black' : '',
                  }}
                  onClick={handleTabClick}
                  id="loved"
                >
                  좋아요한 작품들 {user._count.likedNfts}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </Box>
          )
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              minWidth: '1000px',
            }}
          >
            <TabsGrid
              tabs={tabs}
              createdNfts={user.createdNfts}
              ownedNfts={user.ownedNfts}
              likedNfts={user.likedNfts}
            />
          </Grid>
        </>
      )}
    </Box>
  );
}
