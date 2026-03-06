import Form from '../common/Form';
import Headline from '../common/Headline';
import { ContactProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact2 = ({ header, form, id, hasBackground = false, items }: ContactProps) => {
  const primaryColor = "#ffffff";

  return (
    <WidgetWrapper
      id={id ? id : ''}
      hasBackground={hasBackground}
      containerClass="max-w-7xl mx-auto"
    >
      {header && <Headline header={header} titleClass="text-3xl sm:text-5xl" />}

      <div className="flex flex-col items-stretch justify-center gap-10 md:gap-16 mt-8">

        {/* Items Section (Address, Phone, Hours) */}
        {items && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white-800 rounded-xl p-6 shadow-lg text-gray-200 flex flex-col gap-3"
              >
                {item.icon && (
                  <item.icon size={32} className="text-gray" style={{ color: primaryColor }} />
                )}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <div className="text-gray-300">
                  {item.description && (Array.isArray(item.description) ? item.description.map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  )) : <p>{item.description}</p>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="flex justify-center">
          <Form {...form} containerClass="card h-fit max-w-2xl mx-auto p-5 md:p-12" btnPosition="right" />
        </div>

        {/* Contact Info + Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start bg-white-800 rounded-xl shadow-lg p-6">

          {/* Contact Info */}
          <div className="flex flex-col gap-3 text-gray-200 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt style={{ color: primaryColor }} />
              <span>West Nile Region, Uganda</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope style={{ color: primaryColor }} />
              <span>inquirersunett@gmail|info@unnet.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone style={{ color: primaryColor }} />
              <span>+256 772603162</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-4 md:mt-0">
            {[FaFacebook, FaInstagram, FaYoutube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-3 rounded-lg text-gray hover:scale-110 transition-transform"
                style={{ backgroundColor: primaryColor }}
              >
                <Icon />
              </a>
            ))}
          </div>

        </div>

        {/* Google Map */}
        <div className="w-full h-72 md:h-96 mt-6 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="WNETF Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.0123456789!2d31.222222!3d2.555555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db23456789%3A0x123456789abcdef!2sWest%20Nile%2C%20Uganda!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </WidgetWrapper>
  );
};

export default Contact2;
