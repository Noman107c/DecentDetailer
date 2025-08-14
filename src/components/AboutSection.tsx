
import { Wrench, Car, Check, Users } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-decent-lightBlue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-decent-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-decent-blue mb-4">About Decent Detailers</h2>
          <div className="w-24 h-1 bg-decent-lightBlue mx-auto mb-6 relative">
            <motion.div 
              className="absolute -top-1 left-0 w-6 h-3 bg-decent-blue rounded-full"
              animate={{ 
                x: [0, 60, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            ></motion.div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing showroom-quality results to your doorstep with 9+ years of expertise
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerChildrenVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-decent-blue mb-4"
            >
              We Don't Just Clean Cars – We Restore Them to Showroom Perfection
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-700 mb-6"
            >
              At Decent Detailers we don't just clean cars – we restore them to showroom perfection. As a fully mobile detailing service, we bring 9+ years of expertise, premium products, and certified techniques directly to your doorstep.
            </motion.p>
            
            <motion.div 
              variants={staggerChildrenVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            >
              <motion.div 
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="flex items-start"
              >
                <div className="bg-decent-blue/10 p-3 rounded-full mr-3">
                  <Car size={24} className="text-decent-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-decent-blue mb-1">Come to You Service</h4>
                  <p className="text-sm text-gray-600">No travel fees, no waiting in lines</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="flex items-start"
              >
                <div className="bg-decent-blue/10 p-3 rounded-full mr-3">
                  <Check size={24} className="text-decent-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-decent-blue mb-1">Showroom-Quality Results</h4>
                  <p className="text-sm text-gray-600">From basic washes to ceramic coatings</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="flex items-start"
              >
                <div className="bg-decent-blue/10 p-3 rounded-full mr-3">
                  <Users size={24} className="text-decent-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-decent-blue mb-1">Trusted Pros</h4>
                  <p className="text-sm text-gray-600">Certified in paint correction and protective coatings</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="flex items-start"
              >
                <div className="bg-decent-blue/10 p-3 rounded-full mr-3">
                  <Wrench size={24} className="text-decent-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-decent-blue mb-1">Premium Products</h4>
                  <p className="text-sm text-gray-600">Using only the best detailing products</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-700 italic border-l-4 border-decent-lightBlue pl-4 py-2 bg-decent-light/30"
            >
              "We're obsessed with the details so you can enjoy that new-car feeling – wherever you park."
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div 
              className="rounded-lg overflow-hidden shadow-xl"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1601362840469-51e4d58a8da2?q=80&w=1000&auto=format&fit=crop"
                alt="Car detailing professional at work" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-decent-blue rounded-lg p-6 shadow-lg w-48 z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
              }}
            >
              <p className="text-white font-bold text-xl">9+ Years</p>
              <p className="text-white text-sm">Professional Experience</p>
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 -right-6 bg-decent-lightBlue rounded-lg p-4 shadow-lg z-10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
              }}
            >
              <p className="text-white font-semibold">500+</p>
              <p className="text-white text-xs">Satisfied Customers</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
