import { selectCategoryStyles } from '../utils/styles';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function SelectCategory() {
  const screenWidth = useWindowDimensions().width;
  return (
    <div css={selectCategoryStyles(screenWidth)}>
      <div>
        <div className="triangle" />
      </div>
      <p>Select by category</p>
    </div>
  );
}
