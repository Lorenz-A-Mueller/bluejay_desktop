import { useState } from 'react';
import { selectCategoryStyles } from '../utils/styles';
import { SelectCategoryProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function SelectCategory(props: SelectCategoryProps) {
  const [dropDownHeight, setDropDownHeight] = useState(0);
  const [triangleAngle, setTriangleAngle] = useState(270);

  const screenWidth = useWindowDimensions().width;
  return (
    <div css={selectCategoryStyles(screenWidth!)}>
      <div
        onMouseOver={() => {
          setDropDownHeight(172);
          setTriangleAngle(360);
        }}
        onFocus={() => {
          setDropDownHeight(172);
          setTriangleAngle(360);
        }}
        onMouseOut={() => {
          setDropDownHeight(0);
          setTriangleAngle(270);
        }}
        onBlur={() => {
          setDropDownHeight(0);
          setTriangleAngle(270);
        }}
      >
        <div className="triangle-container">
          <div
            className="triangle"
            style={{
              transform: `rotate(${triangleAngle}deg)`,
              transition: 'transform 0.5s',
            }}
          />
        </div>
        <p>
          {props.categories && props.selectedCategory
            ? `Category :
                 ${
                   props.categories.find(
                     (category) => category.id === props.selectedCategory,
                   )?.category_name
                 }`
            : 'Select by category'}
        </p>
        <button
          className="reset-icon"
          onClick={() => props.setSelectedCategory('')}
          style={{ display: !props.selectedCategory ? 'none' : 'block' }}
        />
      </div>
      <div
        className="dropdown-container"
        style={{ height: `${dropDownHeight}px`, transition: 'height 1s' }}
        onMouseOver={() => {
          setDropDownHeight(172);
          setTriangleAngle(360);
        }}
        onFocus={() => {
          setDropDownHeight(172);
          setTriangleAngle(360);
        }}
        onMouseOut={() => {
          setDropDownHeight(0);
          setTriangleAngle(270);
        }}
        onBlur={() => {
          setDropDownHeight(0);
          setTriangleAngle(270);
        }}
      >
        {props.categories &&
          props.categories.map((category) => (
            <button
              key={`category-key-${category.category_name}`}
              onClick={() => props.setSelectedCategory(category.id)}
              style={
                props.selectedCategory === category.id
                  ? { backgroundColor: '#FFC671' }
                  : {}
              }
            >
              {category.category_name}
            </button>
          ))}
      </div>
    </div>
  );
}
