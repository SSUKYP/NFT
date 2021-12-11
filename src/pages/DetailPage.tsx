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
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Nft } from '../lib/api/types';
import ipfsToUrl from '../lib/ipfsToUrl';
import React, { useEffect, useState } from 'react';
import { LogObject } from 'caver-js';
import { Serie } from '@nivo/line';
import { useUserState } from '../atoms/authState';
import makeContract from '../lib/makeKsea';
import { useSnackbar } from 'notistack';

interface Transactions {
  from: string;
  to: string;
  price: string | number;
  date: LogObject[];
}

interface NivoTxData {
  x: string;
  y: number | string;
}

const DetailPage = ({ location }: RouteComponentProps) => {
  const nft = location.state as Nft;
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [data, setData] = useState<Serie[]>([]);
  const user = useUserState();
  const contract = makeContract();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    const tx: Transactions[] = [];
    const txData: NivoTxData[] = [];

    window.caver.rpc.klay.getBlockByNumber(nft.tokenId).then(block => {
      console.log(block);
      block.transactions.map(transaction => {
        txData.push({
          x: '2021-12-01',
          y: transaction.gasPrice,
        });
        window.caver.rpc.klay
          .getTransactionReceipt(transaction.hash)
          .then(receipt => {
            tx.push({
              from: receipt.from,
              to: receipt.to,
              price: receipt.gasPrice,
              date: receipt.logs,
            });
          });
      });
    });

    const NivoData = [
      {
        id: nft.name,
        color: 'hsl(268, 70%, 50%)',
        data: txData,
      },
    ];

    setTransactions([...tx]);
    setData([...NivoData]);
  }, [nft]);

  const handleSellClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (nft.price === 0) {
      enqueueSnackbar('판매하지 않는 미술품입니다.', { variant: 'error' });
      return;
    }

    const tx = window.caver.transaction.valueTransfer.create({
      from: user.walletAddress,
      to: contract.options.address,
      value: caver.utils.toPeb(nft.price, 'KLAY'),
      gas: 200000,
    });

    window.caver.rpc.klay.sendTransaction(tx).then(console.log);

    enqueueSnackbar('구매하였습니다.', { variant: 'success' });

    history.push('/account');
  };

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
                  <Typography>설명 : {nft.description}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>
                    가격 : {nft.price === 0 ? '판매되지 않습니다.' : nft.price}
                  </Typography>
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
                    onClick={handleSellClick}
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
                <TableRow key={transaction.from}>
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
