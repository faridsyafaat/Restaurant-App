import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ variant = 'default', size = 'md', className = '', children, ...props }) => {
    const variantClasses = {
        default: 'bg-[#C12116] text-white',
        outline: 'border border-[#C12116] text-black bg-white',
        short: 'bg-[#C12116] text-white px-4 py-2 rounded-full',
    };
    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    return (_jsx("button", { className: `
        rounded-full 
        font-semibold 
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `, ...props, children: children }));
};
