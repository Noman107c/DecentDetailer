import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { format } from "date-fns";
import { CalendarIcon, Car, Clock, MapPin, Check, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { serviceTypes, additionalServices, vehicleTypes, timeSlots, usStates } from "@/utils/services";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";


// U.S. States data


// Common/popular states for faster access
const popularStates = ["CA", "FL", "IL", "NY", "TX"];

const Booking = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    selectedServices: [] as { serviceType: string, package: string }[],
    additionalServices: [] as string[],
    vehicleType: "",
    vehicleLength: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: null as Date | null,
    timeSlot: "",
    notes: ""
  });

  // Service selection state
  const [selectedServiceType, setSelectedServiceType] = useState("");

  const isSpecialtyVehicle = formData.vehicleType === "rv" || formData.vehicleType === "boat";
  
  const handleServicePackageSelect = (serviceType: string, packageId: string) => {
    setFormData(prev => {
      const existingIndex = prev.selectedServices.findIndex(s => s.serviceType === serviceType);
      if (existingIndex >= 0) {
        const updatedServices = [...prev.selectedServices];
        updatedServices[existingIndex] = { serviceType, package: packageId };
        return { ...prev, selectedServices: updatedServices };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, { serviceType, package: packageId }]
        };
      }
    });
  };
  
  const handleRemoveService = (serviceType: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.filter(s => s.serviceType !== serviceType)
    }));
  };

  const handleCheckboxChange = (id: string) => {
    setFormData(prev => {
      if (prev.additionalServices.includes(id)) {
        return { ...prev, additionalServices: prev.additionalServices.filter(item => item !== id) };
      } else {
        return { ...prev, additionalServices: [...prev.additionalServices, id] };
      }
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (name === "serviceType") {
      setSelectedServiceType(value);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setFormData(prev => ({ ...prev, date }));
    }
  };
  
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a new FormData object for the submission
      const formspreeData = new FormData();
      
      // Set up Formspree specific fields
      formspreeData.append("_subject", `Booking Confirmation - ${formData.firstName} ${formData.lastName}`);
      formspreeData.append("_replyto", formData.email);
      formspreeData.append("email", formData.email); // Ensure email is set for autoresponder
      
      // Configure the autoresponder
      formspreeData.append("_autoresponse", "Thank you for your booking with Detail Drive Shine");
      
      // Customer information
      formspreeData.append("firstName", formData.firstName);
      formspreeData.append("lastName", formData.lastName);
      formspreeData.append("phone", formData.phone);
      formspreeData.append("address", formData.address);
      formspreeData.append("city", formData.city);
      formspreeData.append("state", formData.state);
      formspreeData.append("zip", formData.zip);
      
      // Appointment details
      const formattedDate = formData.date ? formData.date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : '';
      formspreeData.append("date", formattedDate);
      formspreeData.append("timeSlot", formData.timeSlot);
      
      // Vehicle information
      formspreeData.append("vehicleType", getVehicleTypeName(formData.vehicleType));
      formspreeData.append("vehicleMake", formData.vehicleMake);
      formspreeData.append("vehicleModel", formData.vehicleModel);
      formspreeData.append("vehicleYear", formData.vehicleYear);
      formspreeData.append("vehicleColor", formData.vehicleColor);
      if (formData.vehicleLength) {
        formspreeData.append("vehicleLength", formData.vehicleLength);
      }
      
      // Selected services
      formData.selectedServices.forEach((service, index) => {
        const serviceType = serviceTypes.find(s => s.id === service.serviceType);
        const packageInfo = serviceType?.packages.find(p => p.id === service.package);
        formspreeData.append(`service_${index + 1}_type`, serviceType?.name || '');
        formspreeData.append(`service_${index + 1}_package`, packageInfo?.name || '');
        formspreeData.append(`service_${index + 1}_price`, packageInfo?.price || '');
      });
      
      // Additional services
      formData.additionalServices.forEach((serviceId, index) => {
        const service = additionalServices.find(s => s.id === serviceId);
        formspreeData.append(`addon_${index + 1}`, `${service?.name} (${service?.price})`);
      });
      
      // Additional notes
      if (formData.notes) {
        formspreeData.append("notes", formData.notes);
      }
      
      // Create properly formatted HTML templates
      
      // HTML template for admin with proper Content-Type
      const adminHtmlTemplate = getAdminEmailTemplate();
      formspreeData.append("_email.html", adminHtmlTemplate);
      formspreeData.append("_email.from", "Detail Drive Shine <no-reply@detaildriveshine.com>");
      formspreeData.append("_email.to", "mark2359978@gmail.com");
      
      // User autoresponse configuration with HTML content
      const userHtmlTemplate = getUserEmailTemplate();
      formspreeData.append("_autoresponse.body", userHtmlTemplate);
      formspreeData.append("_autoresponse.subject", "Your Booking Confirmation - Detail Drive Shine");
      formspreeData.append("_autoresponse.from", "Detail Drive Shine <no-reply@formspree.io>");
      
      // Log what we're sending for debugging
      console.log("Sending form data to Formspree");
      
      const response = await fetch('https://formspree.io/f/mvgalbky', {
        method: 'POST',
        body: formspreeData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Important: Store the form data for the confirmation modal
        setShowConfirmation(true);
        toast({
          title: "Booking Successful",
          description: "Your appointment has been scheduled. You'll receive a confirmation by email shortly.",
        });
      } else {
        console.error("Formspree error:", await response.text());
        toast({
          title: "Submission Error",
          description: "There was a problem submitting your booking. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Booking form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    
    // Reset form after confirmation is closed
    setFormData({
      selectedServices: [],
      additionalServices: [],
      vehicleType: "",
      vehicleLength: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      date: null,
      timeSlot: "",
      notes: ""
    });
    setDate(undefined);
    setStep(1);
  };

  const getServiceTypeDetails = (serviceTypeId: string) => {
    return serviceTypes.find(s => s.id === serviceTypeId);
  };

  const getPackageDetails = (serviceTypeId: string, packageId: string) => {
    const serviceType = serviceTypes.find(s => s.id === serviceTypeId);
    return serviceType?.packages.find(p => p.id === packageId);
  };
  
  const getVehicleTypeName = (vehicleTypeId: string) => {
    const vehicleType = vehicleTypes.find(v => v.id === vehicleTypeId);
    return vehicleType?.name || vehicleTypeId;
  };

  // Generate admin email template for detailed booking information
  const getAdminEmailTemplate = () => {
    // Format the selected services
    const selectedPackagesInfo = formData.selectedServices.map(service => {
      const serviceInfo = serviceTypes.find(s => s.id === service.serviceType);
      const packageInfo = serviceInfo?.packages.find(p => p.id === service.package);
      return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name} (${packageInfo.price})` : "";
    }).join("<br>");
    
    // Format add-on services
    const addonsList = formData.additionalServices.map(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      return service ? `${service.name} (${service.price})` : "";
    }).join("<br>");
    
    // Full vehicle details
    const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
    const vehicleTypeInfo = getVehicleTypeName(formData.vehicleType);
    
    // Format date and time for email
    const formattedDate = formData.date ? format(formData.date, 'MMMM d, yyyy') : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
        <div style="background-color: #1E40AF; color: white; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">New Booking Request</h2>
        </div>
        
        <div style="padding: 20px; border: 1px solid #eee;">
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; color: #1E40AF;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; width: 40%;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${formData.firstName} ${formData.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">${formData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;">${formData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Address:</strong></td>
              <td style="padding: 8px 0;">${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</td>
            </tr>
          </table>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Appointment Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; width: 40%;"><strong>Date:</strong></td>
              <td style="padding: 8px 0;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Time:</strong></td>
              <td style="padding: 8px 0;">${formData.timeSlot}</td>
            </tr>
          </table>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Vehicle Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; width: 40%;"><strong>Vehicle Type:</strong></td>
              <td style="padding: 8px 0;">${vehicleTypeInfo}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Vehicle:</strong></td>
              <td style="padding: 8px 0;">${vehicleDetails}</td>
            </tr>
            ${formData.vehicleLength ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Length:</strong></td>
              <td style="padding: 8px 0;">${formData.vehicleLength} feet</td>
            </tr>` : ''}
          </table>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Services Booked</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>Selected Packages:</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">${selectedPackagesInfo}</td>
            </tr>
          </table>
          
          ${addonsList ? `
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Additional Services</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;">${addonsList}</td>
            </tr>
          </table>` : ''}
          
          ${formData.notes ? `
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Customer Notes</h3>
          <p style="padding: 8px 0;">${formData.notes}</p>` : ''}
        </div>
        
        <div style="text-align: center; padding: 10px; background-color: #f5f5f5; color: #666; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Detail Drive Shine. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  };

  // Generate email template for user confirmation
  const getUserEmailTemplate = () => {
    // Get selected package names for email template
    const selectedPackagesInfo = formData.selectedServices.map(service => {
      const serviceInfo = serviceTypes.find(s => s.id === service.serviceType);
      const packageInfo = serviceInfo?.packages.find(p => p.id === service.package);
      return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name}` : "";
    }).join("<br>");
    
    // Get add-on services for email template
    const addonsList = formData.additionalServices.map(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      return service ? `${service.name} (${service.price})` : "";
    });
    
    // Create add-ons HTML if any add-ons were selected
    let addonsHtml = '';
    if (addonsList.length > 0) {
      addonsHtml = `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Add-ons:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${addonsList.join('<br>')}</td>
        </tr>
      `;
    }
    
    // Full vehicle details
    const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
    
    // Format date and time for email
    const formattedDate = formData.date ? format(formData.date, 'MMMM d, yyyy') : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1E40AF; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Detail Drive Shine</h1>
            <p style="margin-top: 10px; margin-bottom: 0;">Booking Confirmation</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${formData.firstName},</p>
            <p>Thank you for booking with Detail Drive Shine. We're excited to provide you with exceptional service.</p>
            <div style="margin: 20px 0;">
              <h3 style="color: #1E40AF;">Appointment Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Time:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.timeSlot}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${selectedPackagesInfo}</td>
                </tr>
                ${addonsHtml}
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Vehicle:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${vehicleDetails}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</td>
                </tr>
              </table>
            </div>
            <p>We look forward to seeing you soon! If you need to make any changes to your appointment, please contact us at <span style="font-weight: bold; color: #1E40AF;">info@detaildriveshine.com</span> or call us at <span style="font-weight: bold; color: #1E40AF;">(555) 123-4567</span>.</p>
          </div>
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
            <p>Detail Drive Shine - Professional Mobile Detailing Services</p>
            <p>&copy; ${new Date().getFullYear()} Detail Drive Shine. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const getConfirmationDetails = () => {
    // Get selected package info
    const selectedPackageNames = formData.selectedServices.map(service => {
      const serviceInfo = serviceTypes.find(s => s.id === service.serviceType);
      const packageInfo = serviceInfo?.packages.find(p => p.id === service.package);
      return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name} (${packageInfo.price})` : "";
    });

    // Get add-on services
    const additionalServiceNames = formData.additionalServices.map(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      return service ? `${service.name} (${service.price})` : "";
    });

    // Vehicle information
    const vehicleDetails = formData.vehicleMake && formData.vehicleModel ? 
      `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})` : 
      "";

    // Date and time
    const formattedDate = formData.date ? format(formData.date, 'MMMM d, yyyy') : '';
    const appointmentDateTime = formattedDate && formData.timeSlot ? 
      `${formattedDate} at ${formData.timeSlot}` : "";

    return (
      <div className="text-sm">
        <p className="font-medium mb-2">Services Selected:</p>
        <ul className="mb-3 space-y-1">
          {selectedPackageNames.map((name, index) => (
            <li key={index} className="flex items-start">
              <Check size={16} className="mr-1 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
        
        {additionalServiceNames.length > 0 && (
          <>
            <p className="font-medium mb-2">Add-on Services:</p>
            <ul className="mb-3 space-y-1">
              {additionalServiceNames.map((name, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="mr-1 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        
        <p className="font-medium mb-2">Vehicle Information:</p>
        <p className="mb-3">{vehicleDetails}</p>
        
        <p className="font-medium mb-2">Appointment:</p>
        <p>{appointmentDateTime}</p>
        {formData.address && (
          <p>{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
        )}
      </div>
    );
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="bg-gradient-to-b from-decent-light to-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-decent-blue mb-4">Book Your Service</h1>
            <div className="w-24 h-1 bg-decent-lightBlue mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule your mobile detailing appointment in just a few simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8 relative">
              <div className="absolute w-4/5 h-[2px] bg-gray-200">
                <div 
                  className="h-full bg-decent-blue transition-all duration-300"
                  style={{ width: `${(step - 1) * 50}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between w-4/5 relative">
                <div className={`flex flex-col items-center`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                    ${step >= 1 ? "bg-decent-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                    1
                  </div>
                  <span className={`mt-2 text-sm ${step >= 1 ? "text-decent-blue font-medium" : "text-gray-500"}`}>
                    Service
                  </span>
                </div>
                
                <div className={`flex flex-col items-center`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                    ${step >= 2 ? "bg-decent-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                    2
                  </div>
                  <span className={`mt-2 text-sm ${step >= 2 ? "text-decent-blue font-medium" : "text-gray-500"}`}>
                    Vehicle
                  </span>
                </div>
                
                <div className={`flex flex-col items-center`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                    ${step >= 3 ? "bg-decent-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                    3
                  </div>
                  <span className={`mt-2 text-sm ${step >= 3 ? "text-decent-blue font-medium" : "text-gray-500"}`}>
                    Details
                  </span>
                </div>
              </div>
            </div>
            
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} action="https://formspree.io/f/mvgalbky" method="POST">
                  {step === 1 && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-decent-blue mb-6">Select Your Service</h2>
                      
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Service Type
                        </label>
                        <Select 
                          value={selectedServiceType} 
                          onValueChange={(value) => setSelectedServiceType(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {selectedServiceType && (
                        <div className="mt-6 animate-fade-in">
                          <h3 className="text-lg font-medium text-decent-blue mb-4">
                            {getServiceTypeDetails(selectedServiceType)?.name} Packages
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getServiceTypeDetails(selectedServiceType)?.packages.map((pkg) => {
                              const isSelected = formData.selectedServices.some(
                                s => s.serviceType === selectedServiceType && s.package === pkg.id
                              );
                              
                              return (
                                <div 
                                  key={pkg.id}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                    isSelected 
                                      ? "border-decent-blue bg-decent-blue/5 shadow-md"
                                      : "border-gray-200 hover:border-decent-blue"
                                  }`}
                                  onClick={() => handleServicePackageSelect(selectedServiceType, pkg.id)}
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="font-medium text-decent-blue">{pkg.name}</div>
                                    <div className="text-lg font-bold">{pkg.price}</div>
                                  </div>
                                  <p className="text-sm text-gray-600">{pkg.description}</p>
                                  {isSelected && (
                                    <div className="mt-2 text-sm text-green-600 flex items-center">
                                      <Check size={16} className="mr-1" />
                                      Selected
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {formData.selectedServices.length > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-decent-blue mb-3">Your Selected Services</h3>
                          <div className="space-y-2">
                            {formData.selectedServices.map((service, index) => {
                              const serviceInfo = getServiceTypeDetails(service.serviceType);
                              const packageInfo = getPackageDetails(service.serviceType, service.package);
                              
                              return (
                                <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                                  <div>
                                    <p className="font-medium">{serviceInfo?.name}</p>
                                    <p className="text-sm text-gray-600">{packageInfo?.name} - {packageInfo?.price}</p>
                                  </div>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                                    onClick={() => handleRemoveService(service.serviceType)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {formData.selectedServices.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium text-decent-blue mb-4">Add-on Services (Optional)</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {additionalServices.map((service) => (
                              <div key={service.id} className="flex items-start space-x-2">
                                <Checkbox
                                  id={service.id}
                                  checked={formData.additionalServices.includes(service.id)}
                                  onCheckedChange={() => handleCheckboxChange(service.id)}
                                />
                                <div className="grid gap-1.5">
                                  <Label htmlFor={service.id} className="text-sm font-medium leading-none">
                                    {service.name}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {service.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    
                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="button" 
                          onClick={nextStep}
                          disabled={formData.selectedServices.length === 0}
                          className="bg-decent-blue hover:bg-decent-lightBlue text-white"
                        >
                          Next Step
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 2 && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-decent-blue mb-6">Vehicle Information</h2>
                      
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Vehicle Type
                        </label>
                        <Select
                          value={formData.vehicleType}
                          onValueChange={(value) => handleSelectChange("vehicleType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicleTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {isSpecialtyVehicle && (
                        <div className="animate-fade-in">
                          <label htmlFor="vehicleLength" className="block text-sm font-medium text-gray-700 mb-1">
                            {formData.vehicleType === "rv" ? "RV Length (feet)" : "Boat Length (feet)"}
                          </label>
                          <Input
                            id="vehicleLength"
                            name="vehicleLength"
                            type="number"
                            value={formData.vehicleLength}
                            onChange={handleInputChange}
                            placeholder="Enter length in feet"
                            required={isSpecialtyVehicle}
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.vehicleType === "rv" 
                              ? "Our pricing for RVs depends on the length" 
                              : "Our pricing for boats is calculated based on length"}
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-1">
                            Make
                          </label>
                          <Input
                            id="vehicleMake"
                            name="vehicleMake"
                            value={formData.vehicleMake}
                            onChange={handleInputChange}
                            placeholder={isSpecialtyVehicle 
                              ? `${formData.vehicleType === "rv" ? "RV" : "Boat"} make/manufacturer` 
                              : "e.g., Toyota, Honda, BMW"}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                            Model
                          </label>
                          <Input
                            id="vehicleModel"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleInputChange}
                            placeholder={isSpecialtyVehicle 
                              ? `${formData.vehicleType === "rv" ? "RV" : "Boat"} model` 
                              : "e.g., Camry, Civic, 3 Series"}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                          </label>
                          <Input
                            id="vehicleYear"
                            name="vehicleYear"
                            value={formData.vehicleYear}
                            onChange={handleInputChange}
                            placeholder="e.g., 2020"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700 mb-1">
                            Color
                          </label>
                          <Input
                            id="vehicleColor"
                            name="vehicleColor"
                            value={formData.vehicleColor}
                            onChange={handleInputChange}
                            placeholder="e.g., Black, Silver, White"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Special Instructions (Optional)
                        </label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Any specific concerns or issues you'd like us to address"
                          rows={3}
                        />
                      </div>
                      
                      <div className="pt-4 flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={prevStep}
                          className="border-decent-blue text-decent-blue"
                        >
                          Back
                        </Button>
                        <Button 
                          type="button" 
                          onClick={nextStep}
                          disabled={!formData.vehicleType || !formData.vehicleMake || !formData.vehicleModel || 
                                   !formData.vehicleYear || !formData.vehicleColor || 
                                   (isSpecialtyVehicle && !formData.vehicleLength)}
                          className="bg-decent-blue hover:bg-decent-lightBlue text-white"
                        >
                          Next Step
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 3 && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-decent-blue mb-6">Contact & Appointment Details</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address (Where we'll perform the service)
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Street address"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) => handleSelectChange("state", value)}
                            required
                          >
                            <SelectTrigger id="state" className="w-full">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Popular States</SelectLabel>
                                {usStates
                                  .filter(state => popularStates.includes(state.abbreviation))
                                  .sort((a, b) => a.name.localeCompare(b.name))
                                  .map(state => (
                                    <SelectItem key={state.abbreviation} value={state.name}>
                                      {state.name} ({state.abbreviation})
                                    </SelectItem>
                                  ))
                                }
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel>All States</SelectLabel>
                                {usStates
                                  .filter(state => !popularStates.includes(state.abbreviation))
                                  .sort((a, b) => a.name.localeCompare(b.name))
                                  .map(state => (
                                    <SelectItem key={state.abbreviation} value={state.name}>
                                      {state.name} ({state.abbreviation})
                                    </SelectItem>
                                  ))
                                }
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2 md:col-span-1">
                          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <Input
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={handleDateChange}
                                disabled={(date) => {
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  return date < today;
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <input 
                            type="hidden" 
                            name="appointmentDate" 
                            value={formData.date ? format(formData.date, 'MMMM d, yyyy') : ''} 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Time
                          </label>
                          <Select
                            name="appointmentTime"
                            value={formData.timeSlot}
                            onValueChange={(value) => handleSelectChange("timeSlot", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Hidden form fields */}
                      {formData.selectedServices.map((service, index) => {
                        const serviceType = serviceTypes.find(s => s.id === service.serviceType);
                        const packageInfo = serviceType?.packages.find(p => p.id === service.package);
                        return (
                          <div key={`hidden-service-${index}`} style={{ display: 'none' }}>
                            <input 
                              type="hidden" 
                              name={`service_${index + 1}_type`}
                              value={serviceType?.name || ''}
                            />
                            <input 
                              type="hidden" 
                              name={`service_${index + 1}_package`}
                              value={packageInfo?.name || ''}
                            />
                          </div>
                        );
                      })}

                      <input type="hidden" name="vehicleType" value={formData.vehicleType} />
                      <input type="hidden" name="vehicleMake" value={formData.vehicleMake} />
                      <input type="hidden" name="vehicleModel" value={formData.vehicleModel} />
                      <input type="hidden" name="vehicleYear" value={formData.vehicleYear} />
                      <input type="hidden" name="vehicleColor" value={formData.vehicleColor} />
                      
                      {/* Order summary */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-decent-blue mb-3">Order Summary</h3>
                        <div className="space-y-2">
                          {formData.selectedServices.map((service, index) => {
                            const serviceInfo = getServiceTypeDetails(service.serviceType);
                            const packageInfo = getPackageDetails(service.serviceType, service.package);
                            return (
                              <div key={index} className="flex justify-between">
                                <span>{serviceInfo?.name} - {packageInfo?.name}</span>
                                <span className="font-medium">{packageInfo?.price}</span>
                              </div>
                            );
                          })}
                          
                          {formData.additionalServices.length > 0 && (
                            <>
                              <div className="border-t border-gray-200 my-2"></div>
                              {formData.additionalServices.map((serviceId, index) => {
                                const service = additionalServices.find(s => s.id === serviceId);
                                return (
                                  <div key={index} className="flex justify-between">
                                    <span>{service?.name}</span>
                                    <span className="font-medium">{service?.price}</span>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={prevStep}
                          className="border-decent-blue text-decent-blue"
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit"
                          disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || 
                                  !formData.phone || !formData.address || !formData.city || !formData.state || 
                                  !formData.zip || !formData.date || !formData.timeSlot}
                          className="bg-decent-blue hover:bg-decent-lightBlue text-white"
                        >
                          {isSubmitting ? "Submitting..." : "Complete Booking"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-decent-blue/10 rounded-xl p-6 flex items-start">
              <div className="mr-3 text-decent-blue">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-medium text-decent-blue mb-1">Mobile Service Area</h3>
                <p className="text-gray-700 text-sm">
                  We provide our mobile detailing services within a 30-mile radius. If you're located outside this area, please contact us for special arrangements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ConfirmationModal
        open={showConfirmation}
        onClose={handleCloseConfirmation}
        title="Booking Confirmed!"
        description={`Thank you ${formData.firstName}! Your appointment has been scheduled for ${formData.date ? format(formData.date, 'MMMM d, yyyy') : ''} at ${formData.timeSlot}.`}
        details={getConfirmationDetails()}
      />
      
      <Footer />
    </div>
  );
};

export default Booking;
