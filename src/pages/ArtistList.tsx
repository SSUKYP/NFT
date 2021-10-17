import * as React from 'react';
import { ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const artists = [
  {
    id: 1,
    artist: '양준혁',
  },
  {
    id: 2,
    artist: '김지수',
  },
  {
    id: 3,
    artist: '박수민',
  },
  {
    id: 4,
    artist: 'Kant',
  },
  {
    id: 5,
    artist: 'BenTham',
  },
  {
    id: 6,
    artist: 'Mill',
  },
  {
    id: 7,
    artist: 'Kotaro',
  },
  {
    id: 8,
    artist: '정성하',
  },
];

interface FromSidebarAccordion {
  filterName: string | false;
  onShow(event: React.SyntheticEvent, filterName: string): void;
}

// caver를 사용해서 작가 검색하기 추가
const ArtistList: React.FunctionComponent<FromSidebarAccordion> = props => {
  const filterName = props.filterName ? props.filterName : '';

  return (
    <List
      sx={{
        width: '100%',
        pt: 1,
        height: '30vh',
        overflow: 'auto',
        color: '#353840',
      }}
    >
      {artists
        .filter(artist => artist.artist.toLowerCase().includes(filterName))
        .map((artist, index) => (
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
            alignItems="flex-start"
            key={index}
          >
            <ListItemButton
              sx={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
              onClick={(event: React.SyntheticEvent) =>
                props.onShow(event, artist.artist)
              }
            >
              <ListItemText primary={artist.artist} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
};

export default ArtistList;
