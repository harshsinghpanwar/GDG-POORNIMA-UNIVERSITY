import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "An error occurred while loading this section. Please try again.",
  onRetry,
  className = ""
}) => {
  return (
    <div className={`p-8 rounded-2xl bg-rose-950/20 border border-rose-900/50 text-center flex flex-col items-center justify-center ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-rose-900/30 border border-rose-800 text-rose-400 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-rose-200 mb-1">{title}</h3>
      <p className="text-sm text-rose-300/80 max-w-md mb-5">{message}</p>
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          icon={<RefreshCw className="w-4 h-4" aria-hidden="true" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
