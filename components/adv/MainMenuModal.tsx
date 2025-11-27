// components/adv/MainMenuModal.tsx
'use client';

import { Box, Typography, Button, Stack, Divider } from '@mui/material';

type Props = {
  onClose: () => void;
};

export const MainMenuModal = ({ onClose }: Props) => {
  // 今は1コース＋チャプター一覧をハードコーディング
  const chapters = [
    { id: 'ec2', title: 'Chapter 1: EC2編 - 人類幸福演算拠点の構築', status: '未着手' },
    { id: 's3', title: 'Chapter 2: S3編 - 幸福データ倉庫の設計', status: '未着手' },
    { id: 'iam', title: 'Chapter 3: IAM編 - 権限と責務の設計', status: '未着手' },
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        bgcolor: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: 720,
          maxHeight: '80%',
          bgcolor: '#020617',
          borderRadius: 3,
          border: '1px solid rgba(250,204,21,0.8)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* ヘッダ */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: '#facc15', fontWeight: 'bold', letterSpacing: 0.5 }}
            >
              MENU
            </Typography>
            <Typography variant="body2" sx={{ color: '#e5e7eb' }}>
              コース／チャプターの目次
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: 'rgba(248,250,252,0.4)',
              color: '#e5e7eb',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#facc15',
                bgcolor: 'rgba(250,204,21,0.08)',
              },
            }}
            onClick={onClose}
          >
            閉じる
          </Button>
        </Box>

        <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)' }} />

        {/* コース情報（今は1コース前提） */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#e5e7eb', fontWeight: 'bold' }}>
            コース：AWS SAA 三銃士編
          </Typography>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            狂人ダルタニャンと三銃士と一緒にAWSアーキテクチャを学ぶeラーニングADV
          </Typography>
        </Box>

        {/* チャプター一覧 */}
        <Box
          sx={{
            mt: 1,
            flex: 1,
            overflowY: 'auto',
            pr: 1,
          }}
        >
          <Stack spacing={1.5}>
            {chapters.map((c) => (
              <Box
                key={c.id}
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(15,23,42,0.85)',
                  border: '1px solid rgba(148,163,184,0.6)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: '#e5e7eb', fontWeight: 500, mb: 0.3 }}
                  >
                    {c.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                    状態：{c.status}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    bgcolor: '#facc15',
                    color: '#1e293b',
                    '&:hover': {
                      bgcolor: '#eab308',
                    },
                  }}
                  onClick={() => {
                    // TODO: ここで選択したチャプターにジャンプする処理を後で追加
                    console.log(`Jump to chapter: ${c.id}`);
                    onClose();
                  }}
                >
                  この章から開始
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* フッターメモ */}
        <Typography variant="caption" sx={{ color: '#6b7280', mt: 1 }}>
          ※ 初回リリースでは1コースのみ。将来的に複数コースをここから選択可能に拡張予定。
        </Typography>
      </Box>
    </Box>
  );
};
