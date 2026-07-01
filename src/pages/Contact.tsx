import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";

// Define Form Schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(12),
  subject: z.enum(["bridal", "zari", "status", "general"], {
    errorMap: () => ({ message: "Please select a subject." }),
  }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Save to localStorage so Admin Dashboard can see the messages!
    const existingInquiries = JSON.parse(localStorage.getItem("divyapriya_inquiries") || "[]");
    const newInquiry = {
      id: "inq-" + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem("divyapriya_inquiries", JSON.stringify([newInquiry, ...existingInquiries]));

    toast.success("Enquiry submitted successfully!", {
      description: "Our design consultants will contact you within 24 hours.",
      duration: 5000,
    });

    reset();
  };

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden text-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/saree-red-gold.jpg"
            alt="Draped silks background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/85"></div>
        </div>
        <div className="container mx-auto relative z-10 max-w-2xl">
          <span className="text-accent font-serif tracking-[0.2em] text-xs font-bold uppercase block mb-3">
            Get in touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white">
            Connect with Our Stylists
          </h1>
          <p className="text-sm text-slate-300 mt-3 font-light leading-relaxed">
            Have questions about thread quality, custom designs, or order delivery? We are here to assist.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact details */}
            <div className="lg:col-span-4 space-y-8 text-left bg-muted/30 border border-border/50 p-8 rounded-2xl">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-primary dark:text-foreground">
                  Divyapriya Showroom
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Visit our physical flagship boutique to explore our full looms collection.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-primary dark:text-foreground text-sm block">Address</span>
                    <span className="text-muted-foreground leading-relaxed font-light block">
                      124, Gandhi Road, Near Temple Tower, Kanchipuram, Tamil Nadu - 631501
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-primary dark:text-foreground text-sm block">Email Address</span>
                    <a href="mailto:divyapriyafashions@gmail.com" className="text-muted-foreground hover:text-accent font-medium block">
                      divyapriyafashions@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-primary dark:text-foreground text-sm block">Phone Number</span>
                    <a href="tel:+919876543210" className="text-muted-foreground hover:text-accent font-medium block">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Store Hours */}
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-primary dark:text-foreground text-sm block">Boutique Hours</span>
                    <span className="text-muted-foreground leading-relaxed font-light block">
                      Mon - Sat: 10:00 AM - 8:30 PM <br />
                      Sunday: 11:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8 bg-card border border-border p-8 rounded-2xl text-left shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-2xl font-bold text-primary dark:text-foreground">
                  Send Us a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-semibold text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Your Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Enter your name"
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="name@example.com"
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 font-bold mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Phone Number</label>
                    <input
                      type="text"
                      {...register("phone")}
                      placeholder="10-digit number"
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-500 font-bold mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Reason for Inquiry</label>
                    <select
                      {...register("subject")}
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="bridal">Bridal Consultation</option>
                      <option value="zari">Custom Zari Design Layout</option>
                      <option value="status">Order / Shipping Status</option>
                    </select>
                    {errors.subject && (
                      <p className="text-[10px] text-red-500 font-bold mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Your Message</label>
                  <textarea
                    rows={5}
                    {...register("message")}
                    placeholder="Write details of the saree you seek..."
                    className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 font-bold mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90 px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Contact;
