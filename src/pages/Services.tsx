import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check, Car, Truck, Zap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import Navbar from "@/components/Navbar";


const Services = () => {
  const [activeTab, setActiveTab] = useState("car-detailing");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const serviceCategories = {
    "car-detailing": {
      title: "Car Detailing Packages",
      description: "Professional detailing services for your car, customized to your needs.",
      image: "/exterior_after.png",
      sections: [
        {
          title: "Exterior Packages",
          packages: [
            {
              name: "Basic Wash Package",
              price: "$150",
              features: [
                "Exterior hand wash",
                "Tire dressing",
                "Basic rim cleaning",
                "Window cleaning"
              ]
            },
            {
              name: "Premium Exterior Package",
              price: "$190",
              features: [
                "Everything in Basic",
                "Clay bar treatment",
                "Hand wax application",
                "Wheel well cleaning",
                "Exterior plastic trim treatment"
              ]
            }
          ]
        }
      ]
    },
    "rv-boat": {
      title: "RV & Boat Packages",
      description: "Specialized cleaning and detailing for larger vehicles, priced per foot.",
      image: "https://images.unsplash.com/photo-1564376130023-5360fbb7c91b?q=80&w=1000&auto=format&fit=crop",
      sections: [
        {
          title: "RV/Boat Packages (Price per foot)",
          packages: [
            {
              name: "Exterior Only",
              price: "$25/ft",
              features: ["Full exterior wash", "Wax application", "Hull/deck cleaning", "Awning cleaning"]
            }
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-decent-light via-white to-white pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-decent-blue/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-decent-lightBlue/10 blur-3xl rounded-full" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-decent-blue mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >







         
           
           
                 Our Premium Services
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Keep your ride shining inside and out with our professional detailing packages tailored to your vehicle.
          </motion.p>
          <motion.div 
            className="text-sm text-decent-blue px-5 py-2 bg-white/70 backdrop-blur-md rounded-full inline-flex items-center shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            ✨ Complimentary air freshener · Touch-up kit · 24-hour rain guarantee
          </motion.div>
        </div>
      </div>

      {/* Services Tabs */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        <Tabs defaultValue="car-detailing" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-decent-light/40 p-2 rounded-xl mb-12">
            <TabsTrigger value="car-detailing" className="rounded-lg data-[state=active]:bg-decent-blue data-[state=active]:text-white">
              <Car size={18} className="mr-1" /> Car Detailing
            </TabsTrigger>
            <TabsTrigger value="rv-boat" className="rounded-lg data-[state=active]:bg-decent-blue data-[state=active]:text-white">
              <Truck size={18} className="mr-1" /> RV & Boat
            </TabsTrigger>
            <TabsTrigger value="specialty-vehicles" className="rounded-lg data-[state=active]:bg-decent-blue data-[state=active]:text-white">
              🏍️ Specialty
            </TabsTrigger>
            <TabsTrigger value="add-ons" className="rounded-lg data-[state=active]:bg-decent-blue data-[state=active]:text-white">
              <Zap size={18} className="mr-1" /> Add-Ons
            </TabsTrigger>
          </TabsList>

          {Object.entries(serviceCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={staggerContainer}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* Left Side - Info */}
                <motion.div variants={fadeIn}>
                  <h2 className="text-3xl font-bold text-decent-blue mb-3">{category.title}</h2>
                  <p className="text-gray-600 mb-8">{category.description}</p>

                  {category.sections.map((section, i) => (
                    <div key={i} className="mb-10">
                      <h3 className="text-lg font-semibold text-decent-blue mb-4 border-b border-decent-light/40 pb-1">
                        {section.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.packages.map((pkg, j) => (
                          <motion.div
                            key={j}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white/70 backdrop-blur-md border border-decent-light/30 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-lg font-bold text-decent-blue">{pkg.name}</h4>
                              <span className="text-xl font-bold text-decent-lightBlue">{pkg.price}</span>
                            </div>
                            <ul className="space-y-2">
                              {pkg.features.map((f, k) => (
                                <li key={k} className="flex items-start text-gray-700 text-sm">
                                  <Check className="h-4 w-4 text-decent-blue mr-2 mt-1" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Right Side - Image */}
                <motion.div variants={fadeIn} className="sticky top-24 hidden lg:block">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <AspectRatio ratio={3 / 4}>
                      <img 
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute bottom-4 right-4 bg-decent-blue text-white px-4 py-3 rounded-lg shadow-lg">
                      <p className="font-semibold">✨ Premium Service</p>
                      <p className="text-xs opacity-90">Satisfaction guaranteed</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="mt-16 bg-gradient-to-r from-decent-blue to-decent-lightBlue text-white text-center py-14 px-6 rounded-t-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-4">Customized Packages Available</h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto mb-8 opacity-90">
          Don't see exactly what you're looking for? We’ll design a custom package tailored just for your vehicle.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/booking" className="bg-white text-decent-blue font-semibold px-6 py-3 rounded-lg hover:bg-decent-light transition-colors">
            Book Now
          </a>
          <a href="/contact" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-decent-blue transition-colors">
            Contact Us
          </a>
        </div>
      </motion.div>

    
    </div>
  );
};

export default Services;
