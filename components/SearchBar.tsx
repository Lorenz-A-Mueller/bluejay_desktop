import { searchBarStyles } from '../utils/styles';
import { SearchBarProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function SearchBar(props: SearchBarProps) {
  const screenWidth = useWindowDimensions().width;
  return (
    <input
      css={searchBarStyles(screenWidth!)}
      placeholder="Search tickets by title or ticket number..."
      value={props.searchBarInput}
      onChange={(e) => props.setSearchBarInput(e.currentTarget.value)}
    />
  );
}
