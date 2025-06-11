import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Droplet, Truck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SITE_CONFIG, CONTACT_INFO } from "@/lib/constants";

export default function About() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About {SITE_CONFIG.name}</h1>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            Delivering pure, fresh water to your doorstep since 2020. 
            We're committed to providing the highest quality water with unmatched convenience.
          </p>
        </div>

        {/* Brand Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-text mb-4">
              Founded in 2020 with a simple mission: make pure, clean water accessible to everyone. 
              What started as a small local business has grown into a trusted water delivery service 
              serving thousands of families and businesses.
            </p>
            <p className="text-gray-text mb-6">
              Our commitment to quality begins at the source. We carefully select natural springs 
              and use advanced purification technology to ensure every drop meets the highest standards 
              of purity and taste.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-gray-text">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50,000+</div>
                <div className="text-sm text-gray-text">Deliveries Made</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-gray-text">Purity Level</div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Water bottling facility" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-gray-text text-lg">The principles that guide our every decision</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Purity First</h3>
              <p className="text-gray-text">
                We maintain the highest standards of water purity through rigorous testing 
                and advanced filtration processes.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliable Service</h3>
              <p className="text-gray-text">
                Consistent, on-time delivery is our promise. We're here when you need us, 
                every single time.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-text">
                We're committed to eco-friendly practices, from recyclable packaging 
                to efficient delivery routes.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-text text-lg">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-primary mr-4" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-text">{CONTACT_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="text-primary mr-4" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-text">{CONTACT_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="text-primary mr-4" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-text">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="text-primary mr-4" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-text">
                      {CONTACT_INFO.businessHours.weekdays}<br />
                      {CONTACT_INFO.businessHours.weekend}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="subscription">Subscription Support</SelectItem>
                      <SelectItem value="delivery">Delivery Issue</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
