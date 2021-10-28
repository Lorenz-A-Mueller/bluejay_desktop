import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import SelectCategory from '../components/SelectCategory';
import Tile from '../components/Tile';
import { allTicketsStyles } from '../utils/styles';

export default function AllTickets() {
  return (
    <Layout>
      <main css={allTicketsStyles}>
        <div className="top-bar">
          <SelectCategory />
          <SearchBar />
        </div>
        <div className="tile-area">
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
        </div>
      </main>
    </Layout>
  );
}
