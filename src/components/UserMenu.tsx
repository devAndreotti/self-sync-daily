
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const UserMenu = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <User className="h-4 w-4" />
        <span>{user?.email}</span>
      </div>
      <ThemeToggle />
      <Button
        onClick={handleSignOut}
        variant="outline"
        size="sm"
        className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border-white/30 dark:border-gray-700 hover:bg-white/70 dark:hover:bg-black/70 transition-all duration-200"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserMenu;
