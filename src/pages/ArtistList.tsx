import * as React from 'react';
import { ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const artists = [
  {
    id: 1,
    artist: 'Vincent Van Gogh',
    title: '별이 빛나는 밤',
    img: 'assets/Starry_Night.jpg',
    price: 0.009,
    like: 10,
    isSold: true,
  },
  {
    id: 2,
    artist: 'Leonardo Da Vinci',
    title: '모나리자',
    img: 'assets/Mona_Lisa.jpg',
    price: 0.01,
    like: 10,
    isSold: true,
  },
  {
    id: 3,
    artist: 'Claude Monet',
    title: '인상, 해돋이',
    img: 'assets/Impression_Sunrise.jpg',
    price: 0.022,
    like: 1,
    isSold: false,
  },
  {
    id: 4,
    artist: '백남준',
    title: '다다익선',
    img: 'assets/dadaikseon.jpg',
    price: 0.014,
    like: 100,
    isSold: true,
  },
  {
    id: 5,
    artist: 'Edvard Munch',
    title: '절규',
    img: 'assets/The_Scream.jpg',
    price: 0.05,
    like: 100,
    isSold: false,
  },
  {
    id: 6,
    artist: 'PRguitarman',
    title: 'POP TART CAT',
    img: 'assets/poptartcat.gif',
    price: 0.02,
    like: 20,
    isSold: true,
  },
  {
    id: 7,
    artist: 'Salvador Dali',
    title: '기억의 지속',
    img: 'assets/Clock.jpg',
    price: 0.01,
    like: 30,
    isSold: true,
  },
  {
    id: 8,
    artist: '안견',
    title: '몽유도원도',
    img: 'assets/mongyou.jpg',
    price: 0.093,
    like: 90,
    isSold: false,
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
