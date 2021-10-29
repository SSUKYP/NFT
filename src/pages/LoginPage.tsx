import { ButtonGroup, Divider, Stack, Typography } from '@mui/material';
import { KaikasLoginButton } from '../components/LoginButton';

export default function LoginPage() {
  return (
    <Stack maxWidth="48em" mx="auto" fontSize="1em" p="1em" spacing={1.5}>
      <Typography variant="h1" fontSize="2rem">
        지갑에 연결하기
      </Typography>

      <Divider />

      <Stack spacing={1}>
        <ButtonGroup
          orientation="vertical"
          aria-label="wallet connect button group"
          color="primary"
        >
          <KaikasLoginButton />
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}
