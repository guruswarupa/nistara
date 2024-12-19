import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.success("Form Submitted Successfully!"); // Instant success feedback
    setForm({ name: "", email: "", subject: "", message: "" }); // Clear form

    // Send data to backend API asynchronously without waiting
    fetch('/api/submitContactForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).catch(err => console.error("Submission Error:", err));

    setLoading(false);
  };

  return (
    <div id="contactus" className="bg-[#0D253F] p-8">
      <Toaster /> {/* Toaster for notifications */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#1D76D2]">Contact Us</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-12">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1C2B3A] p-8 rounded-lg shadow-lg w-full lg:w-1/2"
        >
          <h3 className="text-3xl font-semibold text-[#1D76D2] mb-6">Get in Touch</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 rounded-lg border-2 border-[#1D76D2] bg-[#0D253F] text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 rounded-lg border-2 border-[#1D76D2] bg-[#0D253F] text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-4 rounded-lg border-2 border-[#1D76D2] bg-[#0D253F] text-white placeholder-gray-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={6} // Ensure it's a number here
              className="w-full p-4 rounded-lg border-2 border-[#1D76D2] bg-[#0D253F] text-white placeholder-gray-400"
            />
            <Button
              type="submit"
              disabled={loading} // Disable button if loading
              className={`w-full mt-4 ${loading ? 'bg-gray-500' : 'bg-[#1D76D2]'} text-white border-2 border-[#1D76D2] hover:bg-[#1768B7]`}
            >
              {loading ? 'Submitting...' : 'Send Message'}
            </Button>
          </div>
        </form>

        <div className="w-full lg:w-1/2">
          <h3 className="text-3xl font-semibold text-[#1D76D2] mb-6">Contact Numbers</h3>
          <div className="bg-[#1C2B3A] rounded-lg p-6 space-y-4">
            <div className="flex items-center">
              <span className="text-white text-xl font-semibold mr-4">Toll-Free Number:</span>
              <a
                href="tel:+18001234567"
                className="text-[#1D76D2] text-lg"
              >
                +1 800-123-4567
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-white text-xl font-semibold mr-4">WhatsApp:</span>
              <a
                href="https://wa.me/18001234567"
                className="text-[#1D76D2] text-lg"
              >
                +1 800-123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-white">
          Or reach out to us at:{" "}
          <span className="font-bold text-[#1D76D2]">nistara@gmail.com</span>
        </p>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-white">
          Made with <span className="text-red-500">❤️</span> by team Holy Mackerals
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
