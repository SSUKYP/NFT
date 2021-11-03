import * as React from 'react';
import { ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const tags = ['jpg', 'gif', 'png'];

interface FromSidebarAccordion {
  filterName: string | false;
  onShow(event: React.SyntheticEvent, filterName: string): void;
}

// caver를 사용해서 작가 검색하기 추가
const TagList: React.FunctionComponent<FromSidebarAccordion> = props => {
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
      {tags
        .filter(tag => {
          return tag.toLowerCase().includes(filterName);
        })
        .map((tag, index) => (
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
                props.onShow(event, tag)
              }
            >
              <ListItemText primary={tag} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
};

export default TagList;
