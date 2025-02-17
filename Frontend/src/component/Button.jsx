import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm';
  
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    ghost: 'bg-transparent hover:bg-indigo-50 text-indigo-600',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
  };

  const variantStyles = variants[variant] || variants.default;
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
