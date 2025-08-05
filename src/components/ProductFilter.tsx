import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { getCategories } from "@/redux/slice/api";
import { motion } from "framer-motion";

type ProductFilterProps = {
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
};

const ProductFilter: React.FC<ProductFilterProps> = ({
  onSearchChange,
  onCategoryChange,
  onSortChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.product);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, onSearchChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="p-3 mb-4 rounded-xl border border-gray-200 shadow-lg bg-white space-y-3">
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg focus-within:ring-2 ring-blue-500">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            placeholder="Search product..."
            className="w-full bg-transparent border-0 focus:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">
                Category
              </label>
              <select
                onChange={(e) => onCategoryChange(e.target.value)}
                className="rounded-lg border border-gray-300 shadow-sm bg-white px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                {categories.map((cat) => {
                  const categoryName =
                    typeof cat === "string"
                      ? cat
                      : (cat as { name: string }).name;
                  return (
                    <option key={categoryName} value={categoryName}>
                      {categoryName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" /> Sort By
              </label>
              <select
                onChange={(e) => onSortChange(e.target.value)}
                className="rounded-lg border border-gray-300 shadow-sm bg-white px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Title: A-Z</option>
                <option value="title-desc">Title: Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductFilter;
