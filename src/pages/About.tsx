
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Car, Check, Users, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="bg-gradient-to-b from-decent-light to-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-decent-blue mb-4">About Us</h1>
            <div className="w-24 h-1 bg-decent-lightBlue mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about Decent Detailers and our passion for automotive care
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-decent-blue mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                At Decent Detailers, we don't just clean cars – we restore them to showroom perfection. What started as a passion project in a home garage has grown into a premier mobile detailing service with over 9 years of experience serving our community.
              </p>
              <p className="text-gray-700 mb-6">
                We founded Decent Detailers with a simple mission: bring professional, high-quality auto detailing services directly to our customers. By eliminating the need for you to drive to a physical location, we save you time and make the entire experience more convenient.
              </p>
              <p className="text-gray-700">
                Over the years, we've expanded our services to include window tinting and ceramic coating, always maintaining our commitment to excellence and customer satisfaction. Today, we're proud to be the go-to mobile detailing service for discerning car owners who demand the best.
              </p>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1600964373033-9191dcea1d25?q=80&w=1000&auto=format&fit=crop"
                  alt="Car detailing professional at work" 
                  className="w-full object-cover h-[400px]"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-decent-blue rounded-lg p-6 shadow-lg animate-fade-in">
                <p className="text-white font-bold text-xl">Est. 2016</p>
                <p className="text-white text-sm">Serving our community</p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-decent-blue mb-8 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-decent-blue/10 p-4 rounded-full inline-block mb-4">
                  <Car size={32} className="text-decent-blue" />
                </div>
                <h3 className="text-xl font-bold text-decent-blue mb-3">Mobile Convenience</h3>
                <p className="text-gray-700">
                  We come to your home or workplace, saving you time and hassle. Our fully-equipped mobile setup ensures professional results wherever you are.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-decent-blue/10 p-4 rounded-full inline-block mb-4">
                  <Award size={32} className="text-decent-blue" />
                </div>
                <h3 className="text-xl font-bold text-decent-blue mb-3">Expert Technicians</h3>
                <p className="text-gray-700">
                  Our team is certified in paint correction, ceramic coating application, and window tinting, with extensive training and experience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-decent-blue/10 p-4 rounded-full inline-block mb-4">
                  <Wrench size={32} className="text-decent-blue" />
                </div>
                <h3 className="text-xl font-bold text-decent-blue mb-3">Premium Products</h3>
                <p className="text-gray-700">
                  We use only professional-grade detailing products and equipment that deliver superior results without damaging your vehicle.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-decent-blue/10 p-4 rounded-full inline-block mb-4">
                  <Clock size={32} className="text-decent-blue" />
                </div>
                <h3 className="text-xl font-bold text-decent-blue mb-3">Flexible Scheduling</h3>
                <p className="text-gray-700">
                  We work around your schedule, offering appointments that fit your busy life, including evenings and weekends when needed.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-decent-blue/10 p-4 rounded-full inline-block mb-4">
                  <Users size={32} className="text-decent-blue" />
                </div>
                <h3 className="text-xl font-bold text-decent-blue mb-3">Customer Focused</h3>
                <p className="text-gray-700">
                  Your satisfaction is our priority. We take the time to understand your specific needs and deliver personalized service.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-decent-blue/10 p-4 rounded-full inline-block mb-4">
                  <Check size={32} className="text-decent-blue" />
                </div>
                <h3 className="text-xl font-bold text-decent-blue mb-3">Guaranteed Results</h3>
                <p className="text-gray-700">
                  We stand behind our work with a satisfaction guarantee. If you're not completely satisfied, we'll make it right.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-bold text-decent-blue mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 italic max-w-3xl mx-auto">
              "We're obsessed with the details so you can enjoy that new-car feeling – wherever you park. Our mission is to provide convenient, professional car care services that exceed expectations and build lasting relationships with our customers."
            </p>
          </div>
        </div>
      </div>
      
   
    </div>
  );
};

export default About;
