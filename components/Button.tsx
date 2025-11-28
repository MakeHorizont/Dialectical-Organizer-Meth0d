import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 rounded-lg shadow-sm";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-text-inverted shadow-primary/30 focus:ring-primary",
    secondary: "bg-secondary hover:bg-secondary/90 text-text-inverted focus:ring-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
    danger: "bg-danger hover:bg-danger/90 text-white focus:ring-danger",
    ghost: "text-text-muted hover:bg-primary/5 hover:text-primary",
    success: "bg-success hover:bg-success/90 text-text-inverted focus:ring-success",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};