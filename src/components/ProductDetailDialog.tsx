import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader,
  Star,
  ShoppingCart,
  Percent,
  Box,
  Tag,
  CheckCircle,
} from "lucide-react";
import { useRef } from "react";

const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

const staggerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
  hidden: {},
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springTransition },
  },
};

const ProductDetailDialog = ({
  open,
  onOpenChange,
  product,
  loading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  loading: boolean;
}) => {
  const dialogRef = useRef(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogRef}
        className="w-full max-w-[100vw] md:max-w-[200px]rounded-xl bg-white shadow-xl p-0 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="flex items-center justify-center py-10 text-gray-600 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader className="animate-spin mr-2" />
              Loading product details...
            </motion.div>
          ) : product ? (
            <motion.div
              key="product"
              className="grid grid-cols-1 md:grid-cols-1 gap-0 h-[90vh] overflow-y-auto overflow-x-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-50 p-6 flex  gap-5">
                <motion.div
                  layoutId={`product-image-${product.id}`}
                  className="mb-4  w-[400px] overflow-hidden rounded-xl shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ...springTransition }}
                >
                  <motion.img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-80 object-contain bg-white"
                    whileHover={{ scale: 1.05 }}
                  />
                </motion.div>

                {product.images && product.images.length > 0 && (
                  <motion.div
                    className="grid grid-cols-1 gap-2"
                    initial="hidden"
                    animate="visible"
                    variants={staggerVariants}
                  >
                    {product.images
                      .slice(0, 3)
                      .map((img: string, i: number) => (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          whileHover={{ scale: 1.08, rotate: 1 }}
                          className="cursor-pointer w-20"
                        >
                          <img
                            src={img}
                            alt={`img-${i}`}
                            className="h-20 w-full object-cover rounded-lg border border-gray-200 hover:border-violet-300 transition-all"
                          />
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </div>

              <motion.div
                className="p-8"
                initial="hidden"
                animate="visible"
                variants={staggerVariants}
              >
                <DialogHeader className="text-left">
                  <motion.div variants={fadeUp}>
                    <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </DialogTitle>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    variants={fadeUp}
                  >
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 text-sm font-medium text-amber-800">
                        {product.rating} ({product.stock} in stock)
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.brand}
                    </span>
                  </motion.div>
                </DialogHeader>

                <motion.div variants={fadeUp}>
                  <DialogDescription className="text-left text-gray-700 mb-6">
                    {product.description}
                  </DialogDescription>
                </motion.div>

                <motion.div className="space-y-4 mb-6" variants={fadeUp}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.discountPercentage > 0 && (
                      <>
                        <span className="text-lg line-through text-gray-400">
                          $
                          {(
                            product.price /
                            (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                          <Percent className="h-3 w-3 mr-1" />
                          {product.discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free shipping on all orders</span>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.div
                    className="flex items-start gap-3"
                    variants={fadeUp}
                  >
                    <div className="bg-violet-100 p-2 rounded-full">
                      <Tag className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Category</h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {product.category}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3"
                    variants={fadeUp}
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Box className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Availability
                      </h4>
                      <p className="text-sm text-gray-600">
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ ...springTransition }}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="no-product"
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Box className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No product found
              </h3>
              <p className="mt-1 text-gray-500">
                We couldn't load the product details.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
