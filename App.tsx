
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import AuthScreen from './screens/AuthScreen';
import FeedScreen from './screens/FeedScreen';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return user ? <FeedScreen /> : <AuthScreen />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;
