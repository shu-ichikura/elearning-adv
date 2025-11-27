// app/page.tsx
'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter'; // Xの代わりにアイコンだけ拝借

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 今はバリデーションも認証もなしで /play へ
    router.push('/play');
  };

  const handleSocialLogin = (provider: 'google' | 'x' | 'github') => {
    // 今は全部 /play に飛ばすだけ
    console.log(`Mock ${provider} login`);
    router.push('/play');
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f172a', // ちょい暗め
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 400,
          maxWidth: '100%',
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          eラーニングADV ログイン
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mb={3}>
          AWS SAA × 三銃士 × ADV
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="メールアドレス"
              type="email"
              name="email"
              fullWidth
              size="small"
              autoComplete="email"
              required
            />
            <TextField
              label="パスワード"
              type="password"
              name="password"
              fullWidth
              size="small"
              autoComplete="current-password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              ログイン
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }}>または</Divider>

        <Stack spacing={1}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => handleSocialLogin('google')}
          >
            Googleで続行
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<TwitterIcon />}
            onClick={() => handleSocialLogin('x')}
          >
            Xで続行
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GitHubIcon />}
            onClick={() => handleSocialLogin('github')}
          >
            GitHubで続行
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
