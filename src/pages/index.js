import { useState } from "react";
import styles from "../../styles/Home.module.css";
import CountriesTable from "../components/countriesTable/CountriesTable";
import Layout from "../components/layout/layout";
import SearchInput from "../components/searchInput/SearchInput";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const FilteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Filter by Name, Region or SubRegion"
        onChange={onInputChange}
      />
      <CountriesTable countries={FilteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
