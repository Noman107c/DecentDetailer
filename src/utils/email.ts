// import { format } from "date-fns";
// import { serviceTypes, additionalServices, vehicleTypes } from "@/utils/services";

// export const getVehicleTypeName = (vehicleTypeId: string) => {
// 	const vehicleType = vehicleTypes.find(v => v.id === vehicleTypeId);
// 	return vehicleType?.name || vehicleTypeId;
// };


// export const getAdminEmailTemplate = (formData: any) => {
// 	const selectedPackagesInfo = formData.selectedServices
// 		.map((service: any) => {
// 			const serviceInfo = serviceTypes.find(
// 				(s) => s.id === service.serviceType
// 			);
// 			const packageInfo = serviceInfo?.packages.find(
// 				(p: any) => p.id === service.package
// 			);
// 			return packageInfo
// 				? `${serviceInfo?.name} - ${packageInfo.name} ($${packageInfo.price})`
// 				: "";
// 		})
// 		.filter(Boolean)
// 		.join("<br>");

// 	const addonsList = formData.additionalServices
// 		.map((serviceId: string) => {
// 			const service = additionalServices.find((s) => s.id === serviceId);
// 			return service ? `${service.name} ($${service.price})` : "";
// 		})
// 		.filter(Boolean)
// 		.join("<br>");

// 	const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
// 	const vehicleTypeInfo = getVehicleTypeName(formData.vehicleType);
// 	const formattedDate = formData.date
// 		? format(formData.date, "MMMM d, yyyy")
// 		: "";

// 	return `
//     <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//       <h2 style="color: #1E40AF;">New Appointment Booking</h2>

//       <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; color: #1E40AF;">Customer Information</h3>
//       <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
//       <p><strong>Email:</strong> ${formData.email}</p>
//       <p><strong>Phone:</strong> ${formData.phone}</p>
//       <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</p>

//       <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Vehicle Information</h3>
//       <p><strong>Type:</strong> ${vehicleTypeInfo}</p>
//       <p><strong>Details:</strong> ${vehicleDetails}</p>
//       ${formData.vehicleLength ? `<p><strong>Length:</strong> ${formData.vehicleLength} feet</p>` : ""}

//       ${selectedPackagesInfo
// 			? `
//         <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Selected Services</h3>
//         <p>${selectedPackagesInfo}</p>`
// 			: ""
// 		}

//       ${addonsList
// 			? `
//         <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Additional Services</h3>
//         <p>${addonsList}</p>`
// 			: ""
// 		}

//       <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Appointment Details</h3>
//       <p><strong>Date:</strong> ${formattedDate}</p>
//       <p><strong>Time:</strong> ${formData.timeSlot}</p>

//       ${formData.notes
// 			? `
//       <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Customer Notes</h3>
//       <p>${formData.notes}</p>`
// 			: ""
// 		}

//       <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Pricing</h3>
//       <p><strong>Total Price:</strong> $${formData.totalPrice}</p>
//     </div>
//   `;
// };



// export const getUserEmailTemplate = (formData: any) => {
// 	const selectedPackagesInfo = formData.selectedServices.map((service: any) => {
// 		const serviceInfo = serviceTypes.find(s => s.id === service.serviceType);
// 		const packageInfo = serviceInfo?.packages.find((p: any) => p.id === service.package);
// 		return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name}` : "";
// 	}).join("<br>");

// 	const addonsList = formData.additionalServices.map((serviceId: string) => {
// 		const service = additionalServices.find(s => s.id === serviceId);
// 		return service ? `${service.name} (${service.price})` : "";
// 	});

// 	let addonsHtml = '';
// 	if (addonsList.length > 0) {
// 		addonsHtml = `
// 			<tr>
// 				<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Add-ons:</strong></td>
// 				<td style="padding: 10px; border-bottom: 1px solid #ddd;">${addonsList.join('<br>')}</td>
// 			</tr>
// 		`;
// 	}

// 	const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
// 	const formattedDate = formData.date ? format(formData.date, 'MMMM d, yyyy') : '';

// 	return `
// 		<!DOCTYPE html>
// 		<html>
// 		<head>
// 			<meta charset="utf-8">
// 			<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 			<title>Booking Confirmation</title>
// 		</head>
// 		<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
// 			<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
// 				<div style="background-color: #1E40AF; color: white; padding: 20px; text-align: center;">
// 					<h1 style="margin: 0;">Decent Detailers</h1>
// 					<p style="margin-top: 10px; margin-bottom: 0;">Booking Confirmation</p>
// 				</div>
// 				<div style="padding: 20px; background-color: #f9f9f9;">
// 					<p>Dear ${formData.firstName},</p>
// 					<p>Thank you for booking with Decent Detailers. We're excited to provide you with exceptional service.</p>
// 					<div style="margin: 20px 0;">
// 						<h3 style="color: #1E40AF;">Appointment Details:</h3>
// 						<table style="width: 100%; border-collapse: collapse;">
// 							<tr>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;">${formattedDate}</td>
// 							</tr>
// 							<tr>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Time:</strong></td>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.timeSlot}</td>
// 							</tr>
// 							<tr>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;">${selectedPackagesInfo}</td>
// 							</tr>
// 							${addonsHtml}
// 							<tr>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Vehicle:</strong></td>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;">${vehicleDetails}</td>
// 							</tr>
// 							<tr>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
// 								<td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</td>
// 							</tr>
// 						</table>
// 					</div>
// 					<p>We look forward to seeing you soon! If you need to make any changes to your appointment, please contact us at <span style="font-weight: bold; color: #1E40AF;">info@detaildriveshine.com</span> or call us at <span style="font-weight: bold; color: #1E40AF;">(555) 123-4567</span>.</p>
// 				</div>
// 				<div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
// 					<p>Decent Detailers - Professional Mobile Detailing Services</p>
// 					<p>&copy; ${new Date().getFullYear()} Decent Detailers. All rights reserved.</p>
// 				</div>
// 			</div>
// 		</body>
// 		</html>
// 	`;
// };





import { format } from "date-fns";
import { serviceTypes, additionalServices, vehicleTypes } from "@/utils/services";

export const getVehicleTypeName = (vehicleTypeId: string) => {
	const vehicleType = vehicleTypes.find(v => v.id === vehicleTypeId);
	return vehicleType?.name || vehicleTypeId;
};

const baseTemplate = (title: string, content: string) => {
	return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>${title}</title>
	  <style>
		body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f7fa; margin:0; padding:0; color:#333; }
		.container { max-width:650px; margin:30px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1); }
		.header { background: linear-gradient(135deg, #c1ccd1, #349ccc); text-align:center; padding:50px 20px; color:#fff; position:relative; }
		.logo { width:110px; height:55px; object-fit:cover; border-radius:12px; position:absolute; left:20px; top:50%; transform:translateY(-50%); }
		.heading { color:black; font-size:26px; font-weight:800; margin:0; text-transform:uppercase; letter-spacing:1px; }
		.content { padding:35px; line-height:1.6; }
		.content h2 { color:#0ea5e9; font-size:22px; margin-bottom:10px; }
		.content p { font-size:15px; margin-bottom:15px; }
		.card { background:#fafafa; border:1px solid #eee; border-radius:8px; padding:18px; margin-bottom:20px; }
		.card h3 { color:#000; margin-bottom:12px; font-size:16px; border-bottom:2px solid #0ea5e9; display:inline-block; padding-bottom:4px; }
		.card p { margin:8px 0; font-size:14px; }
		.footer { background: linear-gradient(135deg, #3baee4, #000000); text-align:center; padding:22px; color:#fff; font-size:13px; }
		.footer a { color:#0ea5e9; text-decoration:none; }
	  </style>
	</head>
	<body>
	  <div class="container">
		<div class="header">
		  <img src="/lovable-uploads/0d2360a7-2b5e-482b-881c-8b268207b1db.png" class="logo" alt="Decent Detailers Logo" />
		  <h1 class="heading">${title}</h1>
		</div>
		<div class="content">${content}</div>
		<div class="footer">
		  <p>If you have any questions, contact us at 
		  <a href="mailto:decentautodetailing@gmail.com">decentautodetailing@gmail.com</a>.</p>
		  <p>&copy; ${new Date().getFullYear()} Decent Auto Detailing. All rights reserved.</p>
		</div>
	  </div>
	</body>
	</html>
	`;
};

export const getAdminEmailTemplate = (formData: any) => {
	const selectedPackagesInfo = formData.selectedServices
		.map((service: any) => {
			const serviceInfo = serviceTypes.find(s => s.id === service.serviceType);
			const packageInfo = serviceInfo?.packages.find((p: any) => p.id === service.package);
			return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name} ($${packageInfo.price})` : "";
		})
		.filter(Boolean).join("<br>");

	const addonsList = formData.additionalServices
		.map((serviceId: string) => {
			const service = additionalServices.find(s => s.id === serviceId);
			return service ? `${service.name} ($${service.price})` : "";
		})
		.filter(Boolean).join("<br>");

	const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
	const vehicleTypeInfo = getVehicleTypeName(formData.vehicleType);
	const formattedDate = formData.date ? format(formData.date, "MMMM d, yyyy") : "";

	const content = `
	  <h2>New Booking Received</h2>
	  <div class="card">
		<h3>👤 Customer Info</h3>
		<p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
		<p><strong>Email:</strong> ${formData.email}</p>
		<p><strong>Phone:</strong> ${formData.phone}</p>
		<p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</p>
	  </div>

	  <div class="card">
		<h3>🚗 Vehicle Info</h3>
		<p><strong>Type:</strong> ${vehicleTypeInfo}</p>
		<p><strong>Details:</strong> ${vehicleDetails}</p>
		${formData.vehicleLength ? `<p><strong>Length:</strong> ${formData.vehicleLength} feet</p>` : ""}
	  </div>

	  ${selectedPackagesInfo ? `<div class="card"><h3>🛠 Selected Services</h3><p>${selectedPackagesInfo}</p></div>` : ""}
	  ${addonsList ? `<div class="card"><h3>➕ Add-ons</h3><p>${addonsList}</p></div>` : ""}

	  <div class="card">
		<h3>📅 Appointment</h3>
		<p><strong>Date:</strong> ${formattedDate}</p>
		<p><strong>Time:</strong> ${formData.timeSlot}</p>
	  </div>

	  ${formData.notes ? `<div class="card"><h3>📝 Notes</h3><p>${formData.notes}</p></div>` : ""}

	  <div class="card">
		<h3>💲 Pricing</h3>
		<p><strong>Total:</strong> $${formData.totalPrice}</p>
	  </div>
	`;

	return baseTemplate("New Booking Notification", content);
};

export const getUserEmailTemplate = (formData: any) => {
	const selectedPackagesInfo = formData.selectedServices
		.map((service: any) => {
			const serviceInfo = serviceTypes.find(s => s.id === service.serviceType);
			const packageInfo = serviceInfo?.packages.find((p: any) => p.id === service.package);
			return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name}` : "";
		})
		.join("<br>");

	const addonsList = formData.additionalServices.map((serviceId: string) => {
		const service = additionalServices.find(s => s.id === serviceId);
		return service ? `${service.name} (${service.price})` : "";
	}).join("<br>");

	const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
	const formattedDate = formData.date ? format(formData.date, "MMMM d, yyyy") : "";

	const content = `
	  <h2>Thank you for your booking!</h2>
	  <p>Hi <strong>${formData.firstName}</strong>,</p>
	  <p>We’ve <span style="color:#0ea5e9; font-weight:bold;">successfully received</span> your booking. Below are your details:</p>

	  <div class="card">
		<h3>🛠 Service Details</h3>
		<p><strong>Date:</strong> ${formattedDate}</p>
		<p><strong>Time:</strong> ${formData.timeSlot}</p>
		<p><strong>Services:</strong> ${selectedPackagesInfo}</p>
		${addonsList ? `<p><strong>Add-ons:</strong> ${addonsList}</p>` : ""}
		<p><strong>Total:</strong> $${formData.totalPrice}</p>
	  </div>

	  <div class="card">
		<h3>🚗 Vehicle</h3>
		<p>${vehicleDetails}</p>
	  </div>

	  <div class="card">
		<h3>📍 Location</h3>
		<p>${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</p>
	  </div>

	  <p>We look forward to serving you! If you need changes, contact us at <b style="color:#0ea5e9;">decentautodetailing@gmail.com</b>.</p>
	`;

	return baseTemplate("Booking Confirmation", content);
};
