import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Fingerprint,
  Lock,
  Person,
} from '@mui/icons-material';

const MAX_ATTEMPTS = 5;

export default function LoginPage() {
  const navigate = useNavigate();
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);

  const handleLogin = () => {
    if (!nip || !password) return;
    // Mock login - just navigate to dashboard
    navigate({ to: '/dashboard' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 30%, #1976d2 60%, #1e88e5 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          top: -100,
          right: -100,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          bottom: -80,
          left: -80,
        }}
      />

      <Card
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: 420,
          mx: 2,
          borderRadius: 3,
          overflow: 'visible',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo / Title Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1565c0, #0d47a1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 4px 14px rgba(13,71,161,0.4)',
              }}
            >
              <Fingerprint sx={{ fontSize: 36, color: '#fff' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#0d47a1',
                letterSpacing: 2,
              }}
            >
              ABSSIS
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mt: 0.5 }}
            >
              Sistem Absensi Siswa Terintegrasi
            </Typography>
          </Box>

          {/* NIP / Username Field */}
          <TextField
            fullWidth
            label="NIP / Username"
            placeholder="Masukkan NIP atau username"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
            sx={{ mb: 2.5 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Kata Sandi"
            placeholder="Masukkan kata sandi"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
            sx={{ mb: 2 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Remember Me + Attempts */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{ color: '#1565c0', '&.Mui-checked': { color: '#1565c0' } }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Ingat Saya
                </Typography>
              }
            />
            <Typography
              variant="caption"
              sx={{
                color: attempts <= 2 ? 'error.main' : 'text.secondary',
                fontWeight: attempts <= 2 ? 600 : 400,
              }}
            >
              Sisa percobaan: {attempts}
            </Typography>
          </Box>

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={!nip || !password}
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1565c0, #0d47a1)',
              boxShadow: '0 4px 12px rgba(13,71,161,0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                boxShadow: '0 6px 16px rgba(13,71,161,0.45)',
              },
              '&.Mui-disabled': {
                background: '#bdbdbd',
              },
            }}
          >
            Masuk
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255,255,255,0.7)',
          mt: 4,
          textAlign: 'center',
          letterSpacing: 0.5,
        }}
      >
        ABSSIS v1.0 &mdash; Sistem Absensi Siswa Terintegrasi
      </Typography>
    </Box>
  );
}
