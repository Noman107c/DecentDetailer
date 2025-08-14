
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedWorks = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const beforeAfterImages = [
    {
      id: 1,
      category: "exterior",
      title: "Exterior Detail",
      description: "Full exterior restoration on a black sedan",
      before: "https://images.unsplash.com/photo-1635260597798-98a63db5d2b0?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      category: "interior",
      title: "Interior Transformation",
      description: "Complete interior cleaning and restoration",
      before: "https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1606073716823-e2dde8c3fd16?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      category: "ceramic",
      title: "Ceramic Coating",
      description: "Premium ceramic coating application",
      before: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      category: "tint",
      title: "Window Tint",
      description: "Professional window tinting service",
      before: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop"
    }
  ];
  
  const filteredImages = activeTab === "all" 
    ? beforeAfterImages 
    : beforeAfterImages.filter(img => img.category === activeTab);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-decent-light to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-decent-blue mb-4">
            Our <span className="text-decent-lightBlue">Featured</span> Work
          </h2>
          <div className="w-24 h-1 bg-decent-lightBlue mx-auto mb-6 relative">
            <div className="absolute -top-1 left-0 w-6 h-3 bg-decent-blue rounded-full animate-bounce"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the Decent Detailers difference with our before and after transformations
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {["all", "exterior", "interior", "ceramic", "tint"].map((tab) => (
            <Button 
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab 
                ? "bg-decent-blue hover:bg-decent-lightBlue scale-105 shadow-lg" 
                : "text-decent-blue hover:scale-105"} 
                transition-all duration-300 capitalize`}
            >
              {tab === "all" ? "All Work" : tab}
              {activeTab === tab && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          ))}
        </motion.div>
        
        <div className="hidden md:block">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredImages.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden transition-all duration-300 border-2 border-gray-100 hover:border-decent-lightBlue">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="relative group">
                          <img 
                            src={item.before} 
                            alt={`Before ${item.title}`}
                            className="w-full h-64 object-cover transition-all duration-700 filter group-hover:brightness-90"
                          />
                          <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-1 text-sm rounded-full shadow-md">
                            Before
                          </div>
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative group">
                          <img 
                            src={item.after} 
                            alt={`After ${item.title}`}
                            className="w-full h-64 object-cover transition-all duration-700 filter group-hover:brightness-110"
                          />
                          <div className="absolute top-4 right-4 bg-decent-blue text-white px-4 py-1 text-sm rounded-full shadow-md">
                            After
                          </div>
                          <div className="absolute inset-0 bg-decent-lightBlue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      <div className="p-6 bg-white border-t-2 border-decent-light">
                        <h3 className="text-xl font-bold text-decent-blue group-hover:text-decent-lightBlue transition-colors duration-300">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <Button variant="link" className="text-decent-lightBlue p-0 mt-2 hover:text-decent-blue transition-colors">
                          View Details <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile view with carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {filteredImages.map((item) => (
                <CarouselItem key={item.id} className="basis-full">
                  <Card className="overflow-hidden border-2 border-gray-100 hover:border-decent-lightBlue">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="relative">
                            <img 
                              src={item.before} 
                              alt={`Before ${item.title}`}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/90 text-white px-3 py-1 text-xs rounded-full">
                              Before
                            </div>
                          </div>
                          <div className="relative">
                            <img 
                              src={item.after} 
                              alt={`After ${item.title}`}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-decent-blue text-white px-3 py-1 text-xs rounded-full">
                              After
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <h3 className="text-lg font-bold text-decent-blue">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative -left-0 static h-8 w-8 border-decent-blue text-decent-blue" />
              <CarouselNext className="relative -right-0 static h-8 w-8 border-decent-blue text-decent-blue" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
