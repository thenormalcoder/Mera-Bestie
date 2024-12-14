import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  // Safeguard to avoid undefined product
  if (!product) return null;

  const { _id, image, title, price, salePrice } = product;

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        {/* Product Image */}
        {image ? (
          <img
            src={image}
            alt={title || "Product Image"}
            className="w-full h-[300px] object-cover rounded-t-lg"
            onError={(e) => (e.target.src = "/placeholder.png")} // Fallback for broken image
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-t-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>

      <CardContent>
        {/* Product Title */}
        <h2 className="text-xl font-bold mb-2 mt-2">
          {title || "Unnamed Product"}
        </h2>

        {/* Pricing */}
        <div className="flex justify-between items-center mb-2">
          {price && (
            <span
              className={`text-lg font-semibold ${
                salePrice ? "line-through text-gray-500" : "text-primary"
              }`}
            >
              ${price}
            </span>
          )}
          {salePrice > 0 && (
            <span className="text-lg font-bold text-red-500">
              ${salePrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        {/* Edit Button */}
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(_id);
            setFormData(product);
          }}
        >
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          onClick={() => handleDelete(_id)}
          variant="destructive"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
