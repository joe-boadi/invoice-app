import {
	useImperativeHandle,
	useRef,
	forwardRef,
	useState,
	useEffect,
} from 'react';

import styles from '../../assets/styles/modules/dropdown.module.css';
import downArrow from '../../assets/svg/icon-arrow-down.svg';

import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';

export interface OptionType {
	label: string;
	value: string;
}

interface DropdownProps {
	options?: OptionType[];
	label?: string;
	smallScreenIcon?: React.ReactNode;
	searchParam: string;
}

export interface DropdownRef {
	value: OptionType[];
}

/**
 * @param {object} props - The component props
 * @param {ref} component - The component ref
 * 
 * @param {object} props.options - The options to display in the dropdown
 * @param {string} props.label - The label to display above the dropdown
 * 
 */
const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
	const { options, searchParam } = props;
	// ref
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	// state
	const [selectedOption, setSelectedOption] = useState<string[]>([]);
	// rrd
	const navigate = useNavigate();
	const location = useLocation();
	// libraries
	const isWide = useMediaQuery({
		query: '(min-width: 768px)',
	});

	/**
	 *@param {string} ref - The ref to use for navigation
	 *@param {function} () => - The function to call when the ref is used
	 * @param return [array] return an array[] of values
	 */
	useImperativeHandle(ref, () => {
		return {
			get value() {
				return [];
			},
		};
	});

	/** 
	* {function} handleClick - The function to call when an option is clicked
	* @param {string} option - The option to select
    *  {string} value - The value of the option
	* {string} [searchParam] - The search parameter to update
	* {string} [selectedOption] - The selected option
	* {string} [existingParams] - The existing parameters
	* {string} [updatedParams] - The updated parameters
	* {string} [value] - The value of the option
	* {string} [optionExists] - The option exists
	* @param return JSX.element instance to render a dropdown
	*/

	const handleClick = (option: OptionType) => {
		const value = option.value;
		const searchParams = new URLSearchParams(location.search);
		const existingParams = searchParams.get(searchParam)?.split(',') ?? [];

		const optionExists = existingParams.includes(value);

		if (optionExists) {
			const updatedParams = existingParams.filter((param) => param !== value);
			if (updatedParams.length === 0) {
				searchParams.delete(searchParam);
				setSelectedOption([]);
			} else {
				searchParams.set(searchParam, updatedParams.join(','));
				setSelectedOption(updatedParams);
			}
		} else {
			existingParams.push(value);
			searchParams.set(searchParam, existingParams.join(','));
			setSelectedOption([...selectedOption, value]);
		}

		navigate({
			pathname: location.pathname,
			search: searchParams.toString(),
		});
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const existingParams = searchParams.get(searchParam);

		if (existingParams) {
			setSelectedOption(existingParams.trim().split(','));
		}
	}, [location, searchParam]);

	return (
    <>
      <div
        className={styles.dropdown}
        onClick={() => {
          if (dialogRef.current) {
            dialogRef.current.show();
          }
        }}
        onBlur={() => {
          if (dialogRef.current) {
            dialogRef.current.close();
          }
        }}
      >
        {isWide ? (
          <>
            <p>{props.label ?? "Filter"}</p>
            <img
              src={downArrow}
              style={{
                transform: dialogRef.current?.open
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
              className={styles.arrowIcon}
              alt="down arrow"
            />
          </>
        ) : (
          <>
            <p>{"Filter"}</p>
            <img
              src={downArrow}
              style={{
                transform: dialogRef.current?.open
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
              className={styles.arrowIcon}
              alt="down arrow"
            />
          </>
          // <>{props.smallScreenIcon}</>
        )}
        {options && (
          <dialog
            ref={dialogRef}
            className={`${styles.dropdownDialog} animate fadeIn animate--fast`}
          >
            <div>
              {options?.map((option, index) => {
                const checked = selectedOption.includes(option.value);

                return (
                  <div
                    onClick={() => {
                      handleClick(option);
                    }}
                    key={index}
                  >
                    <div
                      className={`${styles.checkbox} ${
                        checked ? styles.checked : ""
                      }`}
                    ></div>
                    <span className="body-text">{option.label}</span>
                  </div>
                );
              })}
            </div>
          </dialog>
        )}
      </div>
    </>
  );
});
export default Dropdown;