import emailjs from '@emailjs/browser';

// Constants for EmailJS
// IMPORTANT: Replace these with your actual Service ID and Template IDs from your EmailJS dashboard
export const SERVICE_ID = 'service_YOUR_SERVICE_ID'; // e.g., service_gmail
export const TEMPLATE_ID_APPOINTMENT = 'template_YOUR_APPOINTMENT_ID'; // e.g., template_appointment
export const TEMPLATE_ID_CONTACT = 'template_YOUR_CONTACT_ID'; // e.g., template_contact
export const USER_PUBLIC_KEY = '7SV2Z2LgC1GENjNY_'; // Provided by you

/**
 * Initializes EmailJS with the public key.
 * Currently, we are using the public key directly in the send function,
 * but this can be useful for global initialization if needed.
 */
export const initEmailJS = () => {
    emailjs.init({
        publicKey: USER_PUBLIC_KEY,
    });
};

/**
 * Sends an email using EmailJS.
 * @param {string} serviceId - The EmailJS service ID
 * @param {string} templateId - The EmailJS template ID
 * @param {object} templateParams - The parameters to pass to the template
 */
export const sendEmail = async (serviceId, templateId, templateParams) => {
    try {
        const response = await emailjs.send(serviceId, templateId, templateParams, {
            publicKey: USER_PUBLIC_KEY,
        });
        console.log('SUCCESS!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('FAILED...', error);
        throw error; // Re-throw to handle in UI
    }
};
