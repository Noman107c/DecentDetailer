
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check, Car, Truck, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const serviceCategories = {
    "car-detailing": {
      title: "Car Detailing Packages",
      description: "Professional detailing services for your car, customized to your needs.",
      image: "https://images.unsplash.com/photo-1621251097537-9a118da24552?q=80&w=1000&auto=format&fit=crop",
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
        },
        {
          title: "Interior Packages",
          packages: [
            {
              name: "Basic Interior Package",
              price: "$170",
              features: [
                "Complete vacuuming",
                "Dashboard/console wipe down",
                "Door panel cleaning",
                "Basic mat cleaning"
              ]
            },
            {
              name: "Premium Interior Package",
              price: "$220",
              features: [
                "Everything in Basic",
                "Leather/vinyl conditioning",
                "Carpet shampooing",
                "Headliner cleaning",
                "Interior odor elimination"
              ]
            }
          ]
        },
        {
          title: "Full Detail Packages",
          packages: [
            {
              name: "Full Basic Detail",
              price: "$220",
              features: [
                "Basic Exterior + Basic Interior"
              ]
            },
            {
              name: "Full Premium Detail",
              price: "$299",
              features: [
                "Premium Exterior + Premium Interior",
                "Engine bay cleaning",
                "Interior UV protectant"
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
              features: [
                "Full exterior wash",
                "Wax application",
                "Hull/deck cleaning",
                "Awning cleaning"
              ]
            },
            {
              name: "Interior Only",
              price: "$30/ft",
              features: [
                "Complete vacuuming",
                "Surface cleaning",
                "Cabinet wiping",
                "Floor cleaning"
              ]
            },
            {
              name: "Complete Detail",
              price: "$50/ft",
              features: [
                "Full exterior and interior",
                "Upholstery cleaning",
                "Mold/mildew treatment",
                "Protective coatings"
              ]
            }
          ]
        }
      ]
    },
    "specialty-vehicles": {
      title: "Specialty Vehicle Packages",
      description: "Tailored detailing services for motorcycles, ATVs, and other specialty vehicles.",
      image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=1000&auto=format&fit=crop",
      sections: [
        {
          title: "Specialty Vehicle Packages",
          packages: [
            {
              name: "ATV/UTV Package",
              price: "$200",
              features: [
                "Full exterior wash",
                "Underbody cleaning",
                "Plastic trim restoration",
                "Interior wipe down"
              ]
            },
            {
              name: "Motorcycle Package",
              price: "$175",
              features: [
                "Complete bike wash",
                "Chrome polishing",
                "Leather conditioning",
                "Chain cleaning"
              ]
            },
            {
              name: "Boat/Yacht Starter",
              price: "$400+",
              features: [
                "Hull cleaning",
                "Deck scrubbing",
                "Interior surfaces",
                "Window cleaning"
              ]
            }
          ]
        }
      ]
    },
    "add-ons": {
      title: "Add-On Services",
      description: "Enhance your detailing package with these premium add-on services.",
      image: "https://images.unsplash.com/photo-1583080995137-8c0a14e60c25?q=80&w=1000&auto=format&fit=crop",
      sections: [
        {
          title: "Exterior Enhancements",
          packages: [
            {
              name: "Headlight restoration",
              price: "$99",
              features: ["Professional restoration to remove yellowing and haziness"]
            },
            {
              name: "Full window tinting",
              price: "$249",
              features: ["High-quality film with UV protection and heat rejection"]
            },
            {
              name: "Paint correction",
              price: "$150+",
              features: ["Remove swirls, scratches and imperfections"]
            },
            {
              name: "Ceramic coating",
              price: "$300+",
              features: ["Long-lasting protection with enhanced gloss"]
            }
          ]
        },
        {
          title: "Interior Upgrades",
          packages: [
            {
              name: "Pet hair removal",
              price: "$40",
              features: ["Thorough removal of embedded pet hair"]
            },
            {
              name: "Stain removal",
              price: "$60",
              features: ["Professional treatment for tough stains"]
            },
            {
              name: "Full shampoo",
              price: "$75",
              features: ["Deep cleaning of all fabric surfaces"]
            },
            {
              name: "Odor bomb treatment",
              price: "$50",
              features: ["Eliminates stubborn odors at the source"]
            }
          ]
        },
        {
          title: "Protection Packages",
          packages: [
            {
              name: "6-month wax",
              price: "$65",
              features: ["Premium carnauba wax for lasting shine"]
            },
            {
              name: "1-year ceramic",
              price: "$150",
              features: ["Entry-level ceramic protection"]
            },
            {
              name: "Fabric protection",
              price: "$80",
              features: ["Repels liquids and prevents staining"]
            },
            {
              name: "Leather conditioning",
              price: "$60",
              features: ["Nourishes and protects leather surfaces"]
            }
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="bg-gradient-to-b from-decent-light to-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-decent-blue mb-4">Our Services</h1>
            <div className="w-24 h-1 bg-decent-lightBlue mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a variety of professional detailing services to keep your vehicle looking its absolute best
            </p>
            <div className="mt-4 text-sm text-decent-blue px-4 py-2 bg-decent-light/50 rounded-full inline-flex items-center">
              <span className="mr-2">✨</span>
              All packages include complimentary air freshener, touch-up kit, 24-hour rain guarantee, and quality inspection
            </div>
          </motion.div>
          
          <Tabs defaultValue="car-detailing" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-10 rounded-lg">
              <TabsTrigger value="car-detailing" className="text-xs md:text-sm py-3 flex items-center justify-center gap-1">
                <Car size={16} />
                <span className="hidden sm:inline">Car Detailing</span>
              </TabsTrigger>
              <TabsTrigger value="rv-boat" className="text-xs md:text-sm py-3 flex items-center justify-center gap-1">
                <Truck size={16} />
                <span className="hidden sm:inline">RV & Boat</span>
              </TabsTrigger>
              <TabsTrigger value="specialty-vehicles" className="text-xs md:text-sm py-3 flex items-center justify-center gap-1">
                <span>🏍️</span>
                <span className="hidden sm:inline">Specialty</span>
              </TabsTrigger>
              <TabsTrigger value="add-ons" className="text-xs md:text-sm py-3 flex items-center justify-center gap-1">
                <Zap size={16} />
                <span className="hidden sm:inline">Add-Ons</span>
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(serviceCategories).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                >
                  <motion.div variants={fadeIn}>
                    <h2 className="text-3xl font-bold text-decent-blue mb-4">{category.title}</h2>
                    <p className="text-gray-700 mb-8">{category.description}</p>
                    
                    {category.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-10">
                        <h3 className="text-xl font-semibold text-decent-blue mb-5 border-b border-decent-light pb-2">
                          {section.title}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {section.packages.map((pkg, packageIndex) => (
                            <motion.div 
                              key={packageIndex} 
                              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-decent-light/30"
                              whileHover={{ y: -5 }}
                              variants={fadeIn}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-decent-blue">{pkg.name}</h3>
                                <span className="text-xl font-bold text-decent-lightBlue">{pkg.price}</span>
                              </div>
                              
                              <ul className="space-y-2">
                                {pkg.features.map((feature, fIndex) => (
                                  <li key={fIndex} className="flex items-start">
                                    <Check className="h-4 w-4 text-decent-blue mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    variants={fadeIn}
                    className="sticky top-20 hidden lg:block"
                  >
                    <div className="rounded-xl overflow-hidden shadow-xl">
                      <AspectRatio ratio={3/4}>
                        <img 
                          src={category.image}
                          alt={category.title} 
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-decent-blue text-white p-6 rounded-lg shadow-lg">
                      <p className="font-bold text-xl">Professional Service</p>
                      <p className="text-sm">Satisfaction guaranteed</p>
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div 
            className="mt-16 bg-decent-light/30 p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-decent-blue mb-4">Customized Packages Available</h2>
            <p className="text-gray-700 mb-4">
              Don't see exactly what you're looking for? We can create a custom detailing package 
              tailored to your specific vehicle and needs. Contact us today to discuss your requirements.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href="/booking" 
                className="bg-decent-blue hover:bg-decent-lightBlue text-white px-6 py-3 rounded-lg transition-colors"
              >
                Book Now
              </a>
              <a 
                href="/contact" 
                className="bg-white border border-decent-blue text-decent-blue hover:bg-decent-light px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
