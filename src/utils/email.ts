import { format } from "date-fns";
import { serviceTypes, additionalServices, vehicleTypes } from "@/utils/services";

export const getVehicleTypeName = (vehicleTypeId: string) => {
	const vehicleType = vehicleTypes.find(v => v.id === vehicleTypeId);
	return vehicleType?.name || vehicleTypeId;
};


export const getAdminEmailTemplate = (formData: any) => {
  const selectedPackagesInfo = formData.selectedServices
    .map((service: any) => {
      const serviceInfo = serviceTypes.find(
        (s) => s.id === service.serviceType
      );
      const packageInfo = serviceInfo?.packages.find(
        (p: any) => p.id === service.package
      );
      return packageInfo
        ? `${serviceInfo?.name} - ${packageInfo.name} ($${packageInfo.price})`
        : "";
    })
    .join("<br>");

  const addonsList = formData.additionalServices
    .map((serviceId: string) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      return service ? `${service.name} ($${service.price})` : "";
    })
    .join("<br>");

  const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
  const vehicleTypeInfo = getVehicleTypeName(formData.vehicleType);
  const formattedDate = formData.date
    ? format(formData.date, "MMMM d, yyyy")
    : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #1E40AF;">New Appointment Booking</h2>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; color: #1E40AF;">Customer Information</h3>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</p>

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
        ${
          formData.vehicleLength
            ? `
        <tr>
          <td style="padding: 8px 0;"><strong>Length:</strong></td>
          <td style="padding: 8px 0;">${formData.vehicleLength} feet</td>
        </tr>`
            : ""
        }
      </table>
                ${formData.selectedServices.length > 1 ? `<h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Selected Services</h3>` : ""}
      								<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
								<td style="padding: 10px; border-bottom: 1px solid #ddd;">${selectedPackagesInfo}</td>
							</tr>
      }
      ${
        addonsList
          ? `
      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Additional Services</h3>
      <p>${addonsList}</p>`
          : ""
      }

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Appointment Details</h3>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formData.timeSlot}</p>

      ${
        formData.notes
          ? `
      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Customer Notes</h3>
      <p>${formData.notes}</p>`
          : ""
      }

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px; color: #1E40AF;">Total Price</h3>
      <p><strong>$${formData.totalPrice || 0}</strong></p>
    </div>
  `;
};


export const getUserEmailTemplate = (formData: any) => {
	const selectedPackagesInfo = formData.selectedServices.map((service: any) => {
		const serviceInfo = serviceTypes.find(s => s.id === service.serviceType);
		const packageInfo = serviceInfo?.packages.find((p: any) => p.id === service.package);
		return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name}` : "";
	}).join("<br>");

	const addonsList = formData.additionalServices.map((serviceId: string) => {
		const service = additionalServices.find(s => s.id === serviceId);
		return service ? `${service.name} (${service.price})` : "";
	});

	let addonsHtml = '';
	if (addonsList.length > 0) {
		addonsHtml = `
			<tr>
				<td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Add-ons:</strong></td>
				<td style="padding: 10px; border-bottom: 1px solid #ddd;">${addonsList.join('<br>')}</td>
			</tr>
		`;
	}

	const vehicleDetails = `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleColor})`;
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
					<h1 style="margin: 0;">Decent Detailers</h1>
					<p style="margin-top: 10px; margin-bottom: 0;">Booking Confirmation</p>
				</div>
				<div style="padding: 20px; background-color: #f9f9f9;">
					<p>Dear ${formData.firstName},</p>
					<p>Thank you for booking with Decent Detailers. We're excited to provide you with exceptional service.</p>
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
					<p>Decent Detailers - Professional Mobile Detailing Services</p>
					<p>&copy; ${new Date().getFullYear()} Decent Detailers. All rights reserved.</p>
				</div>
			</div>
		</body>
		</html>
	`;
};
