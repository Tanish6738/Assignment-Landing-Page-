import Newsletter from '../models/Newsletter.js';

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed'
      });
    }

    const subscriber = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      subscriber
    });
  } catch (error) {
    console.error('Subscribe newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter',
      error: error.message
    });
  }
};
