"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { inter } from '@/app/fonts';
import clsx from 'clsx';
import { ChevronDown, Search, X } from 'lucide-react';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

/**
 * Represents a single option in the dropdown
 */
export interface DropdownOption {
  /** Unique value for the option */
  value: string | number;
  /** Display text for the option */
  label: string;
  /** Whether this specific option is disabled */
  disabled?: boolean;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
  /** Optional description text below the label */
  description?: string;
  /** Optional custom CSS classes for this option */
  className?: string;
  /** Optional data attributes */
  data?: Record<string, string | number | boolean>;
}

/**
 * Dropdown size variants
 */
export type DropdownSize = 'small' | 'medium' | 'large';

/**
 * Dropdown position relative to trigger
 */
export type DropdownPosition = 'bottom' | 'top' | 'auto';

/**
 * Validation states for the dropdown
 */
export type ValidationState = 'default' | 'success' | 'warning' | 'error';

/**
 * Complete props interface for the Dropdown component
 */
export interface DropdownProps {
  // ============================================================================
  // REQUIRED PROPS
  // ============================================================================
  
  /** Unique identifier for the dropdown field */
  name: string;
  /** Currently selected value */
  value: string | number | '';
  /** Array of options - can be strings or DropdownOption objects */
  options: (string | DropdownOption)[];
  /** Called when dropdown value changes */
  onChange: (value: string | number) => void;

  // ============================================================================
  // LABEL AND TEXT PROPS
  // ============================================================================
  
  /** Label text displayed above the dropdown */
  label?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Helper text displayed below the dropdown */
  helperText?: string;
  /** Text shown when no options are available */
  noOptionsText?: string;
  /** Text shown when search returns no results */
  noResultsText?: string;
  /** Placeholder text for search input */
  searchPlaceholder?: string;

  // ============================================================================
  // STYLING PROPS
  // ============================================================================
  
  /** Additional CSS classes for the dropdown container */
  className?: string;
  /** Additional CSS classes for the label */
  labelClassName?: string;
  /** Additional CSS classes for the dropdown button */
  buttonClassName?: string;
  /** Additional CSS classes for the dropdown menu */
  menuClassName?: string;
  /** Additional CSS classes for individual options */
  optionClassName?: string;
  /** Size variant of the dropdown */
  size?: DropdownSize;

  // ============================================================================
  // STATE PROPS
  // ============================================================================
  
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Whether the dropdown is in loading state */
  loading?: boolean;
  /** Whether the field is required/mandatory */
  mandatory?: boolean;
  /** Whether to highlight the dropdown border */
  highlight?: boolean;
  /** Current validation state */
  validationState?: ValidationState;

  // ============================================================================
  // VALIDATION PROPS
  // ============================================================================
  
  /** Error message to display */
  error?: string;
  /** Success message to display */
  success?: string;
  /** Warning message to display */
  warning?: string;

  // ============================================================================
  // BEHAVIOR PROPS
  // ============================================================================
  
  /** Whether the dropdown supports search/filtering */
  searchable?: boolean;
  /** Whether the dropdown allows clearing selection */
  clearable?: boolean;
  /** Whether dropdown closes after selection */
  closeOnSelect?: boolean;
  /** Whether to close dropdown when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Whether to close dropdown on Escape key */
  closeOnEscape?: boolean;

  // ============================================================================
  // ADVANCED PROPS
  // ============================================================================
  
  /** Maximum number of visible options before scrolling */
  maxVisibleOptions?: number;
  /** Maximum height of dropdown menu in pixels */
  maxHeight?: number;
  /** Position of dropdown menu relative to trigger */
  position?: DropdownPosition;
  /** Z-index for the dropdown menu */
  zIndex?: number;
  /** Minimum characters required before showing search results */
  minSearchLength?: number;
  /** Debounce delay for search in milliseconds */
  searchDebounce?: number;

  // ============================================================================
  // ADD ITEM FUNCTIONALITY
  // ============================================================================
  
  /** Whether to show the add item button */
  showAddButton?: boolean;
  /** Text for the add item button */
  addButtonText?: string;
  /** Icon for the add item button */
  addButtonIcon?: React.ReactNode;
  /** Called when add item button is clicked */
  onAddItem?: () => void;

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  /** Called when dropdown gains focus */
  onFocus?: () => void;
  /** Called when dropdown loses focus */
  onBlur?: () => void;
  /** Called when dropdown opens */
  onOpen?: () => void;
  /** Called when dropdown closes */
  onClose?: () => void;
  /** Called when search query changes */
  onSearch?: (query: string) => void;
  /** Called when clear button is clicked */
  onClear?: () => void;

  // ============================================================================
  // ACCESSIBILITY PROPS
  // ============================================================================
  
  /** ARIA label for the dropdown */
  'aria-label'?: string;
  /** ARIA described by for the dropdown */
  'aria-describedby'?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;

  // ============================================================================
  // DATA PROPS
  // ============================================================================
  
  /** Test ID for testing purposes */
  'data-testid'?: string;
  /** Custom data object */
  data?: Record<string, string | number | boolean>;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Makes specific props required
 */
export type RequiredDropdownProps<K extends keyof DropdownProps> = DropdownProps & Required<Pick<DropdownProps, K>>;

/**
 * Makes specific props optional
 */
export type OptionalDropdownProps<K extends keyof DropdownProps> = Omit<DropdownProps, K> & Partial<Pick<DropdownProps, K>>;

/**
 * Dropdown props for basic usage (commonly required props)
 */
export type BasicDropdownProps = RequiredDropdownProps<'name' | 'value' | 'options' | 'onChange'>;

/**
 * Dropdown props for form usage (includes validation)
 */
export type FormDropdownProps = BasicDropdownProps & {
  label: string;
  mandatory?: boolean;
  error?: string;
  helperText?: string;
};

/**
 * Dropdown props for advanced usage (includes all optional features)
 */
export type AdvancedDropdownProps = DropdownProps & {
  searchable: true;
  clearable: true;
  showAddButton?: boolean;
};

/**
 * Dropdown props for inventory/category management
 */
export type InventoryDropdownProps = FormDropdownProps & {
  searchable: true;
  showAddButton: true;
  addButtonText: string;
  onAddItem: () => void;
};

// ============================================================================
// DEFAULT PROPS
// ============================================================================

export const defaultDropdownProps: Partial<DropdownProps> = {
  // Text defaults
  placeholder: 'Select an option',
  noOptionsText: 'No options available',
  noResultsText: 'No results found',
  searchPlaceholder: 'Search...',
  addButtonText: 'Add Item',
  
  // Behavior defaults
  size: 'medium',
  position: 'bottom',
  closeOnSelect: true,
  closeOnOutsideClick: true,
  closeOnEscape: true,
  
  // State defaults
  searchable: false,
  clearable: false,
  showAddButton: false,
  disabled: false,
  loading: false,
  mandatory: false,
  highlight: false,
  validationState: 'default',
  
  // Advanced defaults
  maxVisibleOptions: 10,
  maxHeight: 240,
  minSearchLength: 0,
  searchDebounce: 200,
  zIndex: 1000,
  tabIndex: 0,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Type guard to check if an option is a DropdownOption object
 */
export const isDropdownOption = (option: string | DropdownOption): option is DropdownOption => {
  return typeof option === 'object' && option !== null && 'value' in option && 'label' in option;
};

/**
 * Validates dropdown props
 */
export const validateDropdownProps = (props: DropdownProps): string[] => {
  const errors: string[] = [];
  
  if (!props.name) {
    errors.push('name is required');
  }
  
  if (!Array.isArray(props.options)) {
    errors.push('options must be an array');
  }
  
  if (typeof props.onChange !== 'function') {
    errors.push('onChange must be a function');
  }
  
  if (props.showAddButton && !props.onAddItem) {
    errors.push('onAddItem is required when showAddButton is true');
  }
  
  return errors;
};

// ============================================================================
// MAIN DROPDOWN COMPONENT
// ============================================================================

const Dropdown: React.FC<DropdownProps> = (props) => {
  // Merge with default props
  const {
    // Required props
    name,
    value,
    options,
    onChange,

    // Label and text props
    label,
    placeholder = defaultDropdownProps.placeholder!,
    helperText,
    noOptionsText = defaultDropdownProps.noOptionsText!,
    noResultsText = defaultDropdownProps.noResultsText!,
    searchPlaceholder = defaultDropdownProps.searchPlaceholder!,

    // Styling props
    className = '',
    labelClassName = '',
    buttonClassName = '',
    menuClassName = '',
    optionClassName = '',
    size = defaultDropdownProps.size!,

    // State props
    disabled = defaultDropdownProps.disabled!,
    loading = defaultDropdownProps.loading!,
    mandatory = defaultDropdownProps.mandatory!,
    highlight = defaultDropdownProps.highlight!,
    error,
    success,
    warning,

    // Behavior props
    searchable = defaultDropdownProps.searchable!,
    clearable = defaultDropdownProps.clearable!,
    closeOnSelect = defaultDropdownProps.closeOnSelect!,
    closeOnOutsideClick = defaultDropdownProps.closeOnOutsideClick!,
    closeOnEscape = defaultDropdownProps.closeOnEscape!,

    // Advanced props
    maxHeight = defaultDropdownProps.maxHeight!,
    zIndex = defaultDropdownProps.zIndex!,

    // Add item functionality
    showAddButton = defaultDropdownProps.showAddButton!,
    addButtonText = defaultDropdownProps.addButtonText!,
    addButtonIcon,
    onAddItem,

    // Event handlers
    onFocus,
    onBlur,
    onOpen,
    onClose,
    onSearch,
    onClear,

    // Accessibility props
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    tabIndex = defaultDropdownProps.tabIndex!,

    // Data props
    'data-testid': dataTestId,
    data,
  } = props;

  // ============================================================================
  // STATE AND REFS
  // ============================================================================
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // ============================================================================
  // NORMALIZE OPTIONS
  // ============================================================================
  
  const normalizedOptions: DropdownOption[] = useMemo(() => {
    return options.map(option => 
      isDropdownOption(option) 
        ? option
        : { value: option, label: option }
    ).filter(option => !option.disabled);
  }, [options]);

  // ============================================================================
  // SEARCH FUNCTIONALITY
  // ============================================================================
  
  const filteredOptions = useMemo(() => {
    if (!searchable || searchQuery.length < (props.minSearchLength || 0)) {
      return normalizedOptions;
    }

    const query = searchQuery.toLowerCase().trim();
    return normalizedOptions.filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.value.toString().toLowerCase().includes(query) ||
      (option.description && option.description.toLowerCase().includes(query))
    );
  }, [normalizedOptions, searchQuery, searchable, props.minSearchLength]);

  // ============================================================================
  // SELECTED OPTION
  // ============================================================================
  
  const selectedOption = normalizedOptions.find(option => option.value === value);
  const displayValue = loading ? 'Loading...' : selectedOption ? selectedOption.label : placeholder;

  // ============================================================================
  // DROPDOWN HANDLERS
  // ============================================================================
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
    onClose?.();
    onBlur?.();
  }, [onClose, onBlur]);

  const handleOpen = () => {
    if (disabled || loading) return;
    
    setIsOpen(true);
    setHighlightedIndex(-1);
    onOpen?.();
    
    // Focus search input if searchable
    setTimeout(() => {
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 0);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
      onFocus?.();
    }
  };

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    
    if (closeOnSelect) {
      handleClose();
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    onClear?.();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHighlightedIndex(-1);
    onSearch?.(query);
  };

  const handleAddItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddItem?.();
    handleClose();
  };

  // ============================================================================
  // KEYBOARD NAVIGATION
  // ============================================================================
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        }
        break;
        
      case 'Escape':
        if (closeOnEscape) {
          handleClose();
        }
        break;
        
      case 'Tab':
        if (isOpen) {
          handleClose();
        }
        break;
    }
  };

  // ============================================================================
  // CLICK OUTSIDE HANDLER
  // ============================================================================
  
  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnOutsideClick, handleClose]);

  // ============================================================================
  // MESSAGE LOGIC
  // ============================================================================
  
  const messageText = error || warning || success || helperText;
  const messageColor = error 
    ? 'text-red-500' 
    : warning 
    ? 'text-yellow-600' 
    : success 
    ? 'text-green-600' 
    : 'text-gray-500';

  // ============================================================================
  // SIZE CLASSES
  // ============================================================================
  
  const sizeClasses = {
    small: 'h-10 text-sm',
    medium: 'h-12 text-[14px]',
    large: 'h-14 text-lg'
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div 
      className={clsx('relative flex flex-col w-full', inter.className, className)} 
      ref={dropdownRef}
      data-testid={dataTestId}
      {...(data && Object.keys(data).reduce((acc, key) => {
        acc[`data-${key}`] = data[key];
        return acc;
      }, {} as Record<string, string | number | boolean>))}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            'text-[#7E7E7E] text-[14px] font-medium leading-tight pl-[10px] mb-3',
            labelClassName
          )}
        >
          {label}{' '}
          {mandatory && <span className="text-red-500 text-[14px]">*</span>}
        </label>
      )}

      {/* Dropdown Button */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          id={name}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          className={clsx(
            inter.className,
            'w-full border p-3 rounded text-[14px] font-medium leading-normal focus:outline-none flex items-center justify-between',
            sizeClasses[size],
            // Border colors
            error
              ? 'border-red-500 focus:border-red-500'
              : warning
              ? 'border-yellow-400 focus:border-yellow-400'  
              : success
              ? 'border-green-500 focus:border-green-500'
              : highlight
              ? 'border-orange-400'
              : 'border-gray-300 focus:border-blue-500',
            // Background and text
            disabled || loading
              ? 'bg-gray-100 cursor-not-allowed text-gray-400'
              : 'bg-white cursor-pointer',
            !selectedOption ? 'text-gray-400' : 'text-gray-900',
            buttonClassName
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${name}-label` : undefined}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          tabIndex={tabIndex}
        >
          <span className="truncate flex-1 text-left">
            {displayValue}
          </span>
          
          <div className="flex items-center ml-2 space-x-1">
            {/* Clear button */}
            {clearable && value && !disabled && !loading && (
              <div
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                aria-label="Clear selection"
                tabIndex={-1}
                role="button"
              >
                <X className="w-4 h-4 text-gray-400" />
              </div>
            )}
            
            {/* Dropdown arrow */}
            <ChevronDown 
              className={clsx(
                'w-5 h-5 transition-transform',
                isOpen ? 'rotate-180' : '',
                disabled || loading ? 'text-gray-400' : 'text-gray-600'
              )}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && !disabled && !loading && (
          <div 
            className={clsx(
              'absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden',
              menuClassName
            )}
            style={{ 
              maxHeight: `${maxHeight}px`,
              zIndex: zIndex
            }}
            role="listbox"
            aria-labelledby={name}
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div 
              className="overflow-y-auto" 
              style={{ maxHeight: `${maxHeight - (searchable ? 60 : 0) - (showAddButton ? 50 : 0)}px` }}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-3 text-sm text-gray-500 text-center">
                  {searchQuery ? noResultsText : noOptionsText}
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={clsx(
                      'w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors',
                      'first:rounded-t-md last:rounded-b-md',
                      // Selection state
                      option.value === value 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-900',
                      // Highlight state (keyboard navigation)
                      index === highlightedIndex && 'bg-gray-100',
                      optionClassName,
                      option.className
                    )}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    <div className="flex items-center">
                      {option.icon && (
                        <span className="mr-2 flex-shrink-0">{option.icon}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{option.label}</div>
                        {option.description && (
                          <div className="text-[14px] text-gray-500 truncate">{option.description}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Add Item Button */}
            {showAddButton && onAddItem && (
              <div className="border-t border-gray-200 p-2">
                <button
                  type="button"
                  onClick={handleAddItemClick}
                  className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {addButtonIcon && (
                    <span className="mr-2 flex-shrink-0">{addButtonIcon}</span>
                  )}
                  {addButtonText}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message */}
      {messageText && (
        <p className={clsx('text-sm mt-1', messageColor)}>
          {messageText}
        </p>
      )}
    </div>
  );
};

export default Dropdown;