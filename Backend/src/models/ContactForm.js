import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ContactForm", contactFormSchema);
