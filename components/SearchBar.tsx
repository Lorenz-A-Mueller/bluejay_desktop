import { searchBarStyles } from '../utils/styles';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function SearchBar() {
  const screenWidth = useWindowDimensions().width;
  return (
    <input
      css={searchBarStyles(screenWidth!)}
      placeholder="Search Tickets..."
    />
  );
}
