import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  children: React.ReactNode;
}

interface DropdownOptionProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

// Internal props that are passed to DropdownOption after cloning
interface EnhancedDropdownOptionProps extends DropdownOptionProps {
  onClick?: () => void;
  isSelected?: boolean;
}

export function Dropdown({
  value,
  onValueChange,
  disabled = false,
  className = '',
  placeholder = 'Select an option',
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedLabel, setSelectedLabel] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected value when prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Find and set the selected label when value changes
  useEffect(() => {
    if (value) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement<DropdownOptionProps>(child) && child.type === DropdownOption) {
          const optionValue = child.props.value;
          const optionLabel = child.props.children;
          if (optionValue === value) {
            setSelectedLabel(optionLabel as string);
          }
        }
      });
    } else {
      setSelectedLabel('');
    }
  }, [value, children]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newValue: string, label: string) => {
    setSelectedValue(newValue);
    setSelectedLabel(label);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  const options = React.Children.map(children, (child) => {
    if (React.isValidElement<DropdownOptionProps>(child) && child.type === DropdownOption) {
      const optionValue = child.props.value;
      const optionLabel = child.props.children;
      
      return React.cloneElement(child as React.ReactElement<EnhancedDropdownOptionProps>, {
        onClick: () => handleSelect(optionValue, optionLabel as string),
        isSelected: optionValue === selectedValue,
      });
    }
    return child;
  });

  return (
    <div ref={dropdownRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <span className="block truncate">
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className={clsx('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="py-1">
            {options}
          </div>
        </div>
      )}
    </div>
  );
}

export const DropdownOption = React.forwardRef<HTMLDivElement, EnhancedDropdownOptionProps>(
  ({ children, className = '', onClick, isSelected }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={clsx(
          'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100',
          isSelected && 'bg-gray-100',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

DropdownOption.displayName = 'DropdownOption';