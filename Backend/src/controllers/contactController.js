import ContactForm from '../models/ContactForm.js';

export const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const contactForm = await ContactForm.create({
      fullName,
      email,
      mobile,
      city
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactForm
    });
  } catch (error) {
    console.error('Submit contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};
