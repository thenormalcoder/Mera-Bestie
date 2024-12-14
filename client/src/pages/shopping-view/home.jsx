import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Footer from "../shopping-view/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

// Categories and Brands with Icons
import { Book, Gift, Clipboard } from "lucide-react"; // Correct icon imports

const categoriesWithIcon = [
  { id: "books", label: "Books", icon: Book },       // Book icon for Books
  { id: "gift-boxes", label: "Gift Boxes", icon: Gift },  // Gift icon for Gift Boxes
  { id: "stationery", label: "Stationery", icon: Clipboard }, // Clipboard icon for Stationery
];


const collectionItems = [
  {
    img: "https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg",
    title: "Stationery",
    description: "Elevate your workspace with our premium stationery.",
    category: "Stationery",
  },
  {
    img: "https://media.istockphoto.com/id/183276205/photo/gift-boxes.jpg?s=612x612&w=0&k=20&c=JQGvm0KtIeJMBQLWCmUs8C--gNYFaURuZtVbpfw_LpM=",
    title: "Gift Boxes",
    description: "Curated gifts that speak volumes of your affection.",
    category: "Gift Boxes",
  },
  {
    img: "https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=1200",
    title: "Books",
    description: "Transform spaces with our sophisticated decor books.",
    category: "Books",
  },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track if it's the initial load

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Banners
  const currentBanners =
    featureImageList && featureImageList.length > 0
      ? featureImageList.map((slide) => slide.image)
      : [];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % currentBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentBanners]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    setIsInitialLoad(false); // Set it to false once the component has mounted
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {currentBanners.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${!isInitialLoad && index === currentSlide
              ? "opacity-100 transition-opacity duration-1000"
              : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover`}
            alt={`Banner ${index + 1}`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + currentBanners.length) % currentBanners.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % currentBanners.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Shop by Categories Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 pl-77">  {/* Added padding-left as pl-16 (adjustable) */
         /* <h2 className="text-3xl font-bold text-center mb-8">Shop by Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
            {categoriesWithIcon.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-pointer hover:bg-pink-500 hover:text-white hover:font-bold transition-all duration-300 p-4 rounded-lg"
                onClick={() => handleNavigateToListingPage(item, "category")}
              >
                <item.icon className="w-12 h-12 text-pink-500 mb-3 group-hover:text-white" />
                <h3 className="font-semibold text-lg">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>*/}



      {/* Our Collection Section */}
      <section className="py-16 bg-pink-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: 'var(--blue-pink)' }}>
            Our Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {collectionItems.map((item) => (
              <Card
                key={item.category}
                onClick={() => handleNavigateToListingPage(item, "category")}
                className="cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 duration-300"
                style={{ width: '80%', height: '430px' }}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[280px] object-cover mb-4"
                  />
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <p className="text-center text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[600px]"> {/* Height remains the same */}
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.RNJBshhRJcxPoSt2Slj5bAHaEK&pid=Api&P=0&h=180"
              alt="Our Vision"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-4">
              <h3 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Our Vision
              </h3>
              <div className="bg-white/20 backdrop-blur-md border border-white/30 p-12 md:p-16 rounded-3xl max-w-5xl mx-auto shadow-2xl"> {/* Increased width here */}
                <p className="text-lg mb-6">
                  We believe in creating more than just products – we craft experiences that connect hearts,
                  celebrate relationships, and turn ordinary moments into extraordinary memories.
                  Our mission is to be your partner in expressing love, appreciation, and thoughtfulness.
                </p>
                <button
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 px-12 py-4 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                >
                  Our Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />




      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
