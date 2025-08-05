import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, BadgePercent, ArrowRight } from "lucide-react";
import type { Product } from "@/redux/slice/type";

interface Props {
  product: Product;
  onClick: (productId: number) => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300 },
  },
};

const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  return (
    <motion.div
      className="cursor-pointer rounded-lg shadow-sm hover:shadow-md transition-all"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      onClick={() => onClick(product.id)}
    >
      <Card className="h-full overflow-hidden rounded-xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-sm transition-all group hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-violet-50">
        <div className="relative">
          <motion.div
            className="absolute left-3 top-3 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-xs font-bold text-white shadow-md">
              <BadgePercent className="mr-1 h-3 w-3" />
              <span>{product.discountPercentage}% OFF</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-48 w-full overflow-hidden"
            layoutId={`image-${product.id}`}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-95"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0"
              whileHover={{
                opacity: [0, 0.4, 0],
                x: [-150, 200, 400],
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <CardContent className="p-5">
          <motion.div className="space-y-3" variants={containerVariants}>
            {/* Title */}
            <motion.h3
              className="line-clamp-1 text-lg font-bold text-gray-800"
              whileHover={{ color: "hsl(262, 83%, 58%)" }}
              variants={childVariants}
            >
              {product.title}
            </motion.h3>

            <motion.p
              className="line-clamp-2 text-sm text-gray-600"
              variants={childVariants}
            >
              {product.description}
            </motion.p>

            <motion.div
              className="flex items-center justify-between pt-2"
              variants={childVariants}
            >
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="text-xl font-bold text-violet-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  ${product.price}
                </motion.span>
                <motion.span
                  className="text-sm text-gray-400 line-through"
                  whileHover={{ opacity: 1 }}
                >
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </motion.span>
              </div>

              <motion.div
                className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm text-amber-800"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating}</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="pt-4"
              whileHover={{ x: 5 }}
              variants={childVariants}
            >
              <Button
                variant="outline"
                className="w-full gap-2 border-violet-200 bg-white text-violet-600 hover:bg-violet-600 hover:text-white group"
              >
                View Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
