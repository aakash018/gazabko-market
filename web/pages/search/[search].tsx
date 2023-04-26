import axios from "axios";
import { useRouter } from "next/router";
import Slider from "rc-slider";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ProtuctType } from "../../@types/global";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";
import SideBarNav from "../../components/shared/Customer/SideBarNav";
import IntputField from "../../components/shared/Input";

import styles from "../../styles/components/Customer/pages/SearchResult.module.scss";
import { useAlert } from "../_app";

interface SearchFilters {
  price: {
    low: number | null;
    high: number | null;
  };
  brands: string[] | null;
  sort: string | null;
}

const SearchResult: React.FC = () => {
  const router = useRouter();
  const { search, parameter } = router.query;

  const [products, setProducts] = useState<ProtuctType[]>([]);
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState<string[]>([]);

  const [productLowPrice, setUserLowPrice] = useState<number>(0);
  const [productHighPrice, setUserHighPrice] = useState<number>(0);

  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const searchFilters = useRef<SearchFilters>({
    brands: [],
    price: {
      low: null,
      high: null,
    },
    sort: null,
  });

  const sortSelectRef = useRef<HTMLSelectElement>(null);

  const { setAlert } = useAlert();

  useEffect(() => {
    let ignore = false;
    if (!parameter) return;
    (async () => {
      setLoading(true);
      const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/search`,
        {
          params: {
            keyword: parameter,
            category: search,
          },
        }
      );
      setLoading(false);

      if (res.data.status === "ok" && res.data.products) {
        setProducts(res.data.products);

        //? get brands
        const brands = res.data.products.map((product) => {
          return product.brand;
        });

        const price = res.data.products
          .map((prod) =>
            prod.priceAfterDiscount ? prod.priceAfterDiscount : prod.price
          )
          .sort((a, b) => a - b);

        // here set removes repeating names of brands

        //for display
        setBrands([...new Set(brands)]);

        //to check and uncheck brands
        setFilterBrands([...new Set(brands)]);

        //setting search filters to send to server
        searchFilters.current.brands = [...new Set(brands)];

        searchFilters.current.price!.low = price[0];
        searchFilters.current.price!.high = price.pop() as number;

        searchFilters.current.sort = "All Products";
        sortSelectRef.current!.value = "All Products";
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    })();
    return () => {
      ignore = true;
    };
  }, [parameter, search]);

  const handleSortByChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);

    searchFilters.current.sort = e.target.value;

    try {
      console.log(searchFilters.current);
      const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/search/searchWithFilters`,
        {
          params: {
            filters: searchFilters.current,
            keyword: parameter,
          },
        }
      );
      setLoading(false);
      console.log(res.data);
      if (res.data.status === "ok" && res.data.products) {
        setProducts(res.data.products);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setLoading(false);
      setAlert({
        type: "error",
        message: "failed to sort products",
      });
    }
  };

  const handelFilterProductsByBrand = async () => {
    setLoading(true);
    console.log(searchFilters.current);
    const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/search/searchWithFilters`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          filters: searchFilters.current,
          keyword: parameter,
        },
      }
    );
    setLoading(false);

    if (res.data.status === "ok" && res.data.products) {
      setProducts(res.data.products);
    } else {
      setAlert({
        type: "error",
        message: res.data.message,
      });
    }
  };

  const handleFilterProductByPrice = async () => {
    try {
      const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/search/searchWithFilters`,
        {
          params: {
            filters: searchFilters.current,
            keyword: parameter,
          },
        }
      );

      if (res.data.status === "ok" && res.data.products) {
        setProducts(res.data.products);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to filter products",
      });
    }
  };

  const filterBrandSelect = (
    e: ChangeEvent<HTMLInputElement>,
    brand: string
  ) => {
    if (e.target.checked) {
      // if (filterBrands.some((prevBrand) => brand === prevBrand)) return;
      setFilterBrands((prev) => prev.concat(brand));

      searchFilters.current.brands =
        searchFilters.current.brands!.concat(brand);
    } else {
      setFilterBrands((prev) =>
        prev.filter((prevBrand) => prevBrand !== brand)
      );

      searchFilters.current.brands = searchFilters.current.brands!.filter(
        (prev) => prev !== brand
      );
    }
    console.log(searchFilters.current.brands);
  };

  return (
    <Layout type="search">
      <div className={styles.searchPageContainer}>
        <div className={styles.sideBar}>
          <div className={styles.searchSideBar} style={{ paddingTop: "30px" }}>
            <section className={styles.catToSearchIn}>
              {/* <SideBarNav
                title="Category to Search In "
                options={["Electronics", "Men's Fashion", "Women's Fashion"]}
              /> */}
            </section>
            <section className={styles.priceRange}>
              <section className={styles.title}>
                <h1>Price Range</h1>
              </section>
              <div className={styles.values}>
                <section className={styles.val}>
                  <span>From</span>
                  <IntputField
                    type="number"
                    setState={setUserLowPrice}
                    onChange={(e) => {
                      searchFilters.current.price.low = parseInt(
                        e.target.value
                      );
                    }}
                    style={{
                      padding: 5,
                    }}
                  />
                </section>
                <section className={styles.val}>
                  <span>To</span>

                  <IntputField
                    type="number"
                    style={{
                      padding: 5,
                    }}
                    setState={setUserHighPrice}
                    onChange={(e) => {
                      searchFilters.current.price.high = parseInt(
                        e.target.value
                      );
                    }}
                  />
                </section>
              </div>
              <div style={{ marginTop: 10 }}>
                <Button onClick={handleFilterProductByPrice}>Filter</Button>
              </div>
            </section>
            <section className={styles.brand}>
              <section className={styles.title}>
                {" "}
                <h1>Brands</h1>{" "}
              </section>

              {!loading &&
                brands.length !== 0 &&
                brands.map((brand, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <input
                      type="checkbox"
                      onChange={(e) => filterBrandSelect(e, brand)}
                      checked={filterBrands.includes(brand)}
                    />
                    <span>{brand}</span>
                  </div>
                ))}
            </section>

            <Button onClick={handelFilterProductsByBrand}>Filter </Button>
          </div>
        </div>
        <div className={styles.searchResults} style={{ width: "100%" }}>
          <div className={styles.title}>Search results for "{parameter}"</div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "1.3rem",
              }}
            >
              Sort By:
            </span>
            <select
              defaultValue={"All products"}
              onChange={handleSortByChange}
              ref={sortSelectRef}
            >
              <option value="All Products">All Products</option>
              <option value="Price High To Low">Price High To Low</option>
              <option value="Price Low To High">Price Low To High</option>
            </select>
          </div>

          {loading && <h2>Loading...</h2>}
          {!loading && <ShowCase includeTimer={false} products={products} />}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResult;
