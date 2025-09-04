'use client';

import React from 'react';
import { CommunityProvider } from './components/CommunityProvider';
import CommunityContainer from './components/CommunityContainer';

export default function BoardPage() {
  return (
    <CommunityProvider>
      <CommunityContainer />
    </CommunityProvider>
  );
}