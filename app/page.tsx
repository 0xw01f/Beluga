import { Welcome } from '../components/Welcome/Welcome';
import { SearchElement } from '../components/SearchElement/SearchElement';
import { Footer } from '../components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <SearchElement />
      <Footer />
    </>
  );
}
