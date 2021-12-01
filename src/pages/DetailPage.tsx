import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Chart from './Chart';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import Divider from '@mui/material/Divider';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';
import { RouteComponentProps } from 'react-router-dom';
import { Nft } from '../lib/api/types';
import ipfsToUrl from '../lib/ipfsToUrl';

const transactions = [
  {
    id: 1,
    from: '0x9273781adf2938233410',
    to: '0x837276abcd28e837f12',
    price: 0.29,
    date: '2021-10-21',
  },
];

const KlayInKRW = 1968;

const DetailPage = ({ location }: RouteComponentProps) => {
  const nft = location.state as Nft;

  const data = [
    {
      id: nft.name,
      color: 'hsl(268, 70%, 50%)',
      data: [
        {
          x: '2021-10-10',
          y: 0.011 * KlayInKRW,
        },
        {
          x: '2021-10-11',
          y: 0.021 * KlayInKRW,
        },
        {
          x: '2021-10-12',
          y: 0.033 * KlayInKRW,
        },
        {
          x: '2021-10-13',
          y: 0.01 * KlayInKRW,
        },
        {
          x: '2021-10-14',
          y: 0.032 * KlayInKRW,
        },
        {
          x: '2021-10-15',
          y: 0.02 * KlayInKRW,
        },
        {
          x: '2021-10-16',
          y: 0.021 * KlayInKRW,
        },
        {
          x: '2021-10-17',
          y: 0.021 * KlayInKRW,
        },
        {
          x: '2021-10-18',
          y: nft.price * KlayInKRW,
        },
        {
          x: '2021-10-19',
          y: nft.price * KlayInKRW,
        },
      ],
    },
  ];

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '90vh',
        mt: 3,
        justifyContent: 'center',
      }}
    >
      <Grid item xs={4} sx={{ minHeight: '280px', maxWidth: '400px', mr: 10 }}>
        <Card>
          <CardActions>
            <Button
              size="small"
              startIcon={<FavoriteBorderIcon />}
              sx={{ flexGrow: 1 }}
              color="secondary"
            >
              {+nft._count.likedUsers >= 100 ? '99+' : +nft._count.likedUsers}
            </Button>
          </CardActions>
          <CardMedia
            component="img"
            height="280"
            image={ipfsToUrl(nft.image)}
          />
        </Card>
        <Paper sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <DescriptionTwoToneIcon />
                  <Typography variant="h6" component="span">
                    Description
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>
                    작가 : {nft.creator.nickname ?? 'Unnamed'}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>제목 : {nft.name}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>가격 : {nft.price}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'right',
                  }}
                >
                  <Button
                    startIcon={<PaymentTwoToneIcon />}
                    size="large"
                    variant="outlined"
                  >
                    구매하기
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          maxHeight: '500px',
          maxWidth: '1100px',
          justifyContent: 'center',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <AttachMoneyTwoToneIcon />
                <Typography variant="h6" component="span">
                  가격변동
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Chart data={data} />
        <Divider />
      </Grid>
      <Grid item xs={10}>
        <Paper elevation={1} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                  colSpan={5}
                >
                  <MoneyTwoToneIcon />
                  <Typography variant="h6" component="span">
                    거래내역
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>발생</Typography>
                </TableCell>
                <TableCell>
                  <Typography>가격</Typography>
                </TableCell>
                <TableCell>
                  <Typography>FROM</Typography>
                </TableCell>
                <TableCell>
                  <Typography>TO</Typography>
                </TableCell>
                <TableCell>
                  <Typography>날짜</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Typography variant="body2">등록</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{transaction.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{transaction.from}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{transaction.to}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{transaction.date}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DetailPage;
