"use client";

import React, { useState } from 'react';
import { Button, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const CRAWL_ENDPOINTS = [
  { key: 'android', name: 'Android', url: '/api/android-ranking' },
  { key: 'ios', name: 'iOS', url: '/api/ios-ranking' },
  { key: 'nintendo', name: 'Nintendo', url: '/api/nintendo-ranking' },
  { key: 'online', name: 'Online Games', url: '/api/online-rank' },
  { key: 'playstation', name: 'PlayStation', url: '/api/playstation-ranking' },
  { key: 'steam', name: 'Steam', url: '/api/steam-ranking' },
];

type Status = 'idle' | 'pending' | 'success' | 'error';

interface CrawlResult {
  name: string;
  status: Status;
  message: string;
}

const SecretCrawlPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CrawlResult[]>([]);

  const handleCrawl = async () => {
    setLoading(true);
    setResults(CRAWL_ENDPOINTS.map(e => ({ name: e.name, status: 'pending', message: '요청 중...' })));

    const promises = CRAWL_ENDPOINTS.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint.url, { method: 'GET' });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        return { name: endpoint.name, status: 'success' as Status, message: data.message || '성공적으로 완료되었습니다.' };
      } catch (error: unknown) {
        return { name: endpoint.name, status: 'error' as Status, message: (error instanceof Error ? error.message : String(error)) || '알 수 없는 오류가 발생했습니다.' };
      }
    });

    const settledResults = await Promise.all(promises);

    setResults(settledResults);
    setLoading(false);
  };

  const getStatusColor = (status: Status) => {
    if (status === 'success') return 'success.main';
    if (status === 'error') return 'error.main';
    if (status === 'pending') return 'warning.main';
    return 'text.secondary';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <Paper sx={{
        padding: 4,
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #334155',
        maxWidth: '600px',
        width: '100%'
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#e2e8f0' }}>
          데이터 크롤링 트리거
        </Typography>
        <Typography sx={{ mb: 3, color: '#94a3b8' }}>
          아래 버튼을 클릭하여 모든 플랫폼의 게임 랭킹 데이터 크롤링을 수동으로 실행합니다.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleCrawl}
          disabled={loading}
          fullWidth
          sx={{ 
            py: 1.5,
            fontSize: '1rem',
            bgcolor: 'indigo.600',
            '&:hover': { bgcolor: 'indigo.700' }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : '전체 크롤링 시작'}
        </Button>

        {results.length > 0 && (
          <div className="mt-6">
            <Typography variant="h6" sx={{ color: '#cbd5e1', mb: 2 }}>실행 결과:</Typography>
            <List sx={{ backgroundColor: '#0f172a', borderRadius: 2 }}>
              {results.map((result, index) => (
                <ListItem key={index} divider={index < results.length - 1}>
                  <ListItemText
                    primary={result.name}
                    secondary={result.message}
                    primaryTypographyProps={{ color: '#e2e8f0' }}
                    secondaryTypographyProps={{ color: getStatusColor(result.status) }}
                  />
                  {result.status === 'pending' && <CircularProgress size={20} color="inherit" />}
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default SecretCrawlPage;
