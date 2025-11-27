// app/play/page.tsx
'use client';

import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MainMenuModal } from '@/components/adv/MainMenuModal';

export default function PlayPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: '#ffffff', // 外側を白くする
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      {/* メインビュー（ここにADVコンポーネントを後で詰め込む） */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          aspectRatio: '16 / 9',
          bgcolor: '#111827',
          borderRadius: 3,
          border: '2px solid #facc15', // 明るい黄色の枠
          boxShadow: 'none',
          overflow: 'hidden',
          position: 'relative',
          p: 2,
        }}
      >
        {/* 右上の MENU ボタン */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            sx={{
              bgcolor: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(250,204,21,0.7)',
              color: '#facc15',
              '&:hover': {
                bgcolor: 'rgba(24,35,58,0.95)',
              },
            }}
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="caption"
            sx={{ color: '#facc15', textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
          >
            MENU
          </Typography>
        </Box>

        {/* メインビューの中身（今はプレースホルダ） */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 2,
            border: '1px dashed rgba(250,204,21,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e5e7eb',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            ADVメインビュー
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ここに背景・立ち絵・セリフウィンドウ・選択肢などを載せていく
          </Typography>
        </Box>

        {/* メインビュー内にだけ出るメニュー・モーダル */}
        {isMenuOpen && <MainMenuModal onClose={() => setIsMenuOpen(false)} />}
      </Box>
    </Box>
  );
}
