import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

type SellDialogProps = {
  open: boolean;
  onClose: () => void;
  onChange: (price: number) => void;
  price: number;
};
export default function SellDialog(props: SellDialogProps) {
  const [price, setPrice] = useState(props.price);
  const [sell, setSell] = useState(props.price !== 0);

  useEffect(() => {
    if (!sell) {
      setPrice(0);
    }
  }, [sell]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{`미술품의 상태 변경`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`판매 혹은 판매하지 않음으로 선택할 수 있습니다.`}
        </DialogContentText>

        <Stack spacing={2}>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Switch
                checked={sell}
                onChange={event => {
                  setSell(event.target.checked);
                }}
              />
            }
            label={
              sell ? (
                <Typography variant="body2">판매중</Typography>
              ) : (
                <Typography variant="body2">판매중단</Typography>
              )
            }
          />

          <TextField
            disabled={!sell}
            label="가격"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={price}
            onChange={event =>
              setPrice(Number.parseFloat(event.target.value) ?? 0)
            }
          />
        </Stack>

        <DialogActions>
          <Button
            sx={{
              flexDirection: 'column-reverse',
              width: '50%',
            }}
            variant="outlined"
            onClick={() => props.onChange(price)}
          >
            확인
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
