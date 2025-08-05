import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store/store";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Loader from "./Loader";
import ProductFilter from "./ProductFilter";
import ProductDetailDialog from "./ProductDetailDialog";
import { getAllProducts, getProductsByCategory } from "@/redux/slice/api";
import { clearCategoryProducts } from "@/redux/slice/slice";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, categoryProducts, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const limit = 12;
  const skip = (currentPage - 1) * limit;

  const displayedProducts =
    category && category !== "all" ? categoryProducts : products;

  const sortedProducts = [...displayedProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(skip, skip + limit);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  useEffect(() => {
    if (category && category !== "all") {
      dispatch(getProductsByCategory(category));
    } else {
      dispatch(getAllProducts({ limit: 100, skip: 0 }));
    }
  }, [dispatch, category]);

  const fetchProductDetail = async (productId: number) => {
    try {
      setLoadingDetail(true);
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await res.json();
      setSelectedProduct(data);
      setShowDialog(true);
    } catch (err) {
      console.error("Error fetching product details:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="p-4 w-full">
      <ProductFilter
        onSearchChange={setSearchText}
        onCategoryChange={(cat) => {
          if (cat === "all") {
            dispatch(clearCategoryProducts());
          }
          setCategory(cat);
          setCurrentPage(1);
        }}
        onSortChange={setSort}
      />

      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <>
          {paginatedProducts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No products found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onClick={fetchProductDetail}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </>
      )}

      <ProductDetailDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        product={selectedProduct}
        loading={loadingDetail}
      />
    </div>
  );
};

export default ProductList;
