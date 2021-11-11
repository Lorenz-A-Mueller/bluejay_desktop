import { useState } from 'react';
import { selectCategoryStyles } from '../utils/styles';
import { SelectCategoryProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function SelectCategory(props: SelectCategoryProps) {
  const [dropDownHeight, setDropDownHeight] = useState(0);

  const screenWidth = useWindowDimensions().width;
  return (
    <div css={selectCategoryStyles(screenWidth!)}>
      <div
        onMouseOver={() => setDropDownHeight(200)}
        onFocus={() => setDropDownHeight(200)}
        onMouseOut={() => setDropDownHeight(0)}
        onBlur={() => setDropDownHeight(0)}
      >
        <div className="triangle-container">
          <div className="triangle" />
        </div>
        <p>Select by category</p>
      </div>
      <div
        className="dropdown-container"
        style={{ height: `${dropDownHeight}px`, transition: 'height 1s' }}
        onMouseOver={() => setDropDownHeight(200)}
        onFocus={() => setDropDownHeight(200)}
        onMouseOut={() => setDropDownHeight(0)}
        onBlur={() => setDropDownHeight(0)}
      >
        {props.categories &&
          props.categories.map((category) => (
            <button
              key={`category-key-${category.category_name}`}
              onClick={() => props.setSelectedCategory(category.id)}
            >
              {category.category_name}
            </button>
          ))}
      </div>
    </div>
  );
}
