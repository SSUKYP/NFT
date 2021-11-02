import * as React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShopTwoToneIcon from '@mui/icons-material/ShopTwoTone';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import SellTwoToneIcon from '@mui/icons-material/SellTwoTone';
import Box from '@mui/material/Box';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArtistList from './ArtistList';
import { makeStyles } from '@mui/styles';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const styledScroll = makeStyles({
  root: {
    '&::-webkit-scrollbar': {
      width: 7,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      outline: `1px solid slategrey`,
    },
  },
});

interface onShowCallback {
  onShow(event: React.SyntheticEvent, filterName: string): void;
}

export const SidebarAccordion: React.FunctionComponent<onShowCallback> =
  props => {
    const [expand, setExpand] = React.useState<string | false>('panel1');
    const [artist, setArtist] = React.useState<string | false>('');
    const [owner, setOwner] = React.useState<string | false>('');

    const handleChange =
      (panel: string) =>
      (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpand(newExpanded ? panel : false);
      };

    const handleArtistSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setArtist(event.target.value);
    };

    const handleOwnerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOwner(event.target.value);
    };

    const classes = styledScroll();

    return (
      <div>
        <Accordion
          expanded={expand === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{
            justifyContent: 'center',
          }}
          disableGutters={true}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              height: '10vh',
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 1,
            }}
          >
            <FilterListIcon sx={{ width: '33%', flexShrink: 0 }} />
            <Typography sx={{ flexGrow: 2 }} variant="body2">
              필터
            </Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand === 'panel2'}
          onChange={handleChange('panel2')}
          sx={{
            justifyContent: 'center',
          }}
          disableGutters={true}
        >
          <AccordionSummary
            aria-controls="panel2a-content"
            id="panel2a-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 1,
              height: '10vh',
            }}
          >
            <ShopTwoToneIcon sx={{ flexGrow: 1 }} />
            <Typography sx={{ flexGrow: 2 }} variant="body2">
              판매 상태
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<SellTwoToneIcon />}
              sx={{
                flexGrow: 2,
              }}
              onClick={event => props.onShow(event, '판매완료')}
            >
              판매완료
            </Button>
            <Box
              sx={{
                flexGrow: 1,
              }}
            ></Box>
            <Button
              variant="outlined"
              startIcon={<SellTwoToneIcon />}
              sx={{
                flexGrow: 2,
              }}
              onClick={event => props.onShow(event, '판매중')}
            >
              판매중
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion
          onChange={handleChange('panel3')}
          expanded={expand === 'panel3'}
          sx={{
            justifyContent: 'center',
          }}
          disableGutters={true}
        >
          <AccordionSummary
            aria-controls="panel3a-content"
            id="panel3a-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              height: '10vh',
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 1,
            }}
          >
            <PersonSearchTwoToneIcon sx={{ flexGrow: 1 }} />
            <Typography sx={{ flexGrow: 2 }} variant="body2">
              작가별
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: '#BCCEFB30',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box className={classes.root}>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '5vh',
                }}
              >
                <SearchTwoToneIcon />
                <StyledInputBase
                  placeholder="작가별 검색..."
                  onChange={handleOwnerSearch}
                  value={owner}
                />
              </Paper>
              <ArtistList filterName={owner} onShow={props.onShow} />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand === 'panelIV'}
          onChange={handleChange('panelIV')}
          sx={{
            justifyContent: 'center',
          }}
          disableGutters={true}
        >
          <AccordionSummary
            aria-controls="panelIVa-content"
            id="panelIVa-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              height: '10vh',
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 1,
            }}
          >
            <ArchiveTwoToneIcon sx={{ flexGrow: 1 }} />
            <Typography sx={{ flexGrow: 2 }} variant="body2">
              소유자별
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: '#BCCEFB30',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box className={classes.root}>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '5vh',
                }}
              >
                <SearchTwoToneIcon />
                <StyledInputBase
                  placeholder="소유자별 검색..."
                  onChange={handleArtistSearch}
                  value={artist}
                />
              </Paper>
              <ArtistList filterName={artist} onShow={props.onShow} />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand === 'panel5'}
          onChange={handleChange('panel5')}
          sx={{
            justifyContent: 'center',
          }}
          square={true}
          disableGutters={true}
        >
          <AccordionSummary
            aria-controls="panel5a-content"
            id="panel5a-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              height: '10vh',
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 1,
            }}
          >
            <ColorLensTwoToneIcon sx={{ flexGrow: 1 }} />
            <Typography sx={{ flexGrow: 2 }} variant="body2">
              작품별
            </Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </div>
    );
  };
