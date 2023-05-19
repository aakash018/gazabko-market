import { useRouter } from "next/router";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";

import styles from "../../styles/components/Customer/pages/CatogriesPage.module.scss";

import Image from "next/image";

import axios from "axios";
import { ProtuctType } from "../../@types/global";
import { useAlert } from "../_app";

interface SearchFilters {
  price: {
    low: number | null;
    high: number | null;
  };
  brands: string[] | null;
  sort: string | null;
}

const CategoriesPage = () => {
  const router = useRouter();
  const { params } = router.query;

  // const [priceRangeSliderCat, setPriceRangeSliderCat] = useState([0, 100]);
  // const [priceRangeSliderLow, setPriceRangeSliderLow] = useState(0);
  // const [priceRangeSliderHigh, setPriceRangeSliderHigh] = useState(0)

  const [products, setProducts] = useState<ProtuctType[]>([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<string[]>();

  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const searchFilters = useRef<SearchFilters>({
    brands: [],
    price: {
      low: null,
      high: null,
    },
    sort: null,
  });

  const { setAlert } = useAlert();

  useEffect(() => {
    let ignore = false;
    if (!ignore && params && params.length !== 0) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<
            RespondType & { products?: ProtuctType[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/category/getSpecificProduct`,
            {
              params: {
                category: params[0],
                subCategory: params[1],
                subsubCategory: params[2],
              },
            }
          );

          setLoading(false);
          if (res.data.status === "ok" && res.data.products) {
            const brands = res.data.products.map((prod) => prod.brand);
            const price = res.data.products
              .map((prod) =>
                prod.priceAfterDiscount ? prod.priceAfterDiscount : prod.price
              )
              .sort((a, b) => a - b);

            const nonRepeatingBrands = [...new Set(brands)];

            setBrands(nonRepeatingBrands);
            setFilterBrands(nonRepeatingBrands);

            setProducts(res.data.products);

            searchFilters.current.brands = nonRepeatingBrands;

            searchFilters.current.price!.low = price[0];
            searchFilters.current.price!.high = price.pop() as number;

            searchFilters.current.sort = "All Products";
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
            message: "failed to connect to server",
          });
        }
      })();
    }

    return () => {
      ignore = true;
    };
  }, [params]);

  const handleSortByChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);

    searchFilters.current.sort = e.target.value;

    try {
      const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/search/searchCatsWithFilters`,
        {
          params: {
            filters: searchFilters.current,
            keyword: {
              category: (params as any)[0],
              subcategory: (params as any)[1],
              subsubcategory: (params as any)[2],
            },
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

    const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/search/searchCatsWithFilters`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          filters: searchFilters.current,
          keyword: {
            category: (params as any)[0],
            subcategory: (params as any)[1],
            subsubcategory: (params as any)[2],
          },
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
  };

  const handleFilterProductByPrice = async () => {
    try {
      const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/search/searchCatsWithFilters`,
        {
          params: {
            filters: searchFilters.current,
            keyword: {
              category: (params as any)[0],
              subcategory: (params as any)[1],
              subsubcategory: (params as any)[2],
            },
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

  return (
    <Layout type="catogryPage">
      <div className={styles.catPageWrapper}>
        <div style={{ position: "sticky" }}>
          <div className={styles.catogryPage}>
            <section className={styles.subCatogries}>
              {/* <SideBarNav
                title="Sub-catogries"
                options={[
                  "xyz subcat",
                  "xyz subcat",
                  "xyz subcat",
                  "xyz subcat",
                  "xyz subcat",
                ]}
              /> */}
            </section>
            <section className={styles.brands}>
              <div className={styles.title}>Brands</div>
              <ul>
                {brands?.map((brand, i) => (
                  <li key={i}>
                    <input
                      type={"checkbox"}
                      onChange={(e) => filterBrandSelect(e, brand)}
                      checked={filterBrands.includes(brand)}
                    />
                    <span>{brand}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 20 }}>
                <Button onClick={handelFilterProductsByBrand}>Filter</Button>
              </div>
            </section>
            <section className={styles.priceRange}>
              <section className={styles.title}>
                <h1>Price</h1>
              </section>

              <div className={styles.values}>
                <section className={styles.val}>
                  <span>From</span>
                  <input
                    className={styles.rangeUserInput}
                    type="number"
                    onChange={(e) => {
                      searchFilters.current.price.low = parseInt(
                        e.target.value
                      );
                    }}
                  />
                </section>
                <section className={styles.val}>
                  <span>To</span>
                  <input
                    className={styles.rangeUserInput}
                    type="number"
                    onChange={(e) => {
                      searchFilters.current.price.high = parseInt(
                        e.target.value
                      );
                    }}
                  />
                </section>
              </div>
            </section>
            <Button onClick={handleFilterProductByPrice}>Filter </Button>
          </div>
        </div>
        <div className={styles.catogriesPage} style={{ width: "100%" }}>
          <div className={styles.catBanner}>
            <div className={styles.catBanner}>
              <Image
                src={"/images/catogries/bar.jpg"}
                layout="fill"
                objectFit="cover"
                objectPosition={"top"}
              />
              <div className={styles.label}>
                <div className={styles.title}>{(params as any)[0]}</div>
                {/* <div className={styles.topBrands}>
                  <Image
                    src={"/images/brand.png"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/placeHolders/placeHolder.jpeg"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/brand.png"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/placeHolders/placeHolder.jpeg"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/brand.png"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                </div> */}
              </div>
            </div>
          </div>
          <div className={styles.products}>
            <div className={styles.actions}>
              <div className={styles.sort}>
                <span>Sort By:</span>
                <select onChange={(e) => handleSortByChange(e)}>
                  <option value="Best Match" selected={true}>
                    Best Match
                  </option>
                  <option value="Price High To Low">Price High To Low</option>
                  <option value="Price Low To High">Price Low To High</option>
                </select>
              </div>
            </div>
            {!loading && products.length !== 0 && (
              <ShowCase
                title="All Products"
                showTitle={true}
                products={products}
              />
            )}
          </div>
          {loading && <h2>Loading...</h2>}
          {!loading && products.length === 0 && <h2>No products found</h2>}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
