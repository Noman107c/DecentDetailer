import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";

interface HeroBackgroundProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

const HeroBackground = ({ currentSlide, setCurrentSlide }: HeroBackgroundProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [carouselApi, setCarouselApi] = useState<any>(null); // store carousel API

  // Fixed high-quality images
  const images = [
    "https://images.unsplash.com/photo-1605557202210-55aef6a7bc97?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1655370164710-30356ab45cdb?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1635260428481-8236b236ef23?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600979576531-397b9a3fee72?q=80&w=1920&auto=format&fit=crop",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync carousel when currentSlide changes
  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(currentSlide);
    }
  }, [currentSlide, carouselApi]);

  // Optional: Auto-slide every 7 seconds
  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % images.length;
      setCurrentSlide(nextSlide);
    }, 7000);
    return () => clearInterval(interval);
  }, [carouselApi, currentSlide, images.length, setCurrentSlide]);

  const handleSliderChange = (value: number[]) => {
    setCurrentSlide(value[0]);
  };

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10" />

      {/* Dynamic carousel background */}
      <Carousel
        className="h-full w-full"
        setApi={setCarouselApi}
        aria-label="Hero background carousel"
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full w-full">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={image}
                  alt={`Premium car detailing service ${index + 1}`}
                  className="w-full h-full object-cover transform scale-105 animate-slow-pan"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Slider control */}
      <div className="absolute bottom-10 left-4 md:left-10 right-4 md:right-10 z-20">
        <Slider
          value={[currentSlide]}
          max={images.length - 1}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full max-w-md mx-auto md:mx-0"
        />
      </div>
    </div>
  );
};

export default HeroBackground;
