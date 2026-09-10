import Form from '../common/Form';
import Headline from '../common/Headline';
import { ContactProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact2 = ({ header, form, id, hasBackground = false, items }: ContactProps) => {
  return (
    <WidgetWrapper
      id={id ? id : ''}
      hasBackground={hasBackground}
      containerClass="max-w-7xl mx-auto pt-36 lg:pt-40 pb-16"
    >
      {header && <Headline header={header} titleClass="text-3xl sm:text-5xl font-extrabold text-[#032B53]" />}

      <div className="flex flex-col items-stretch justify-center gap-12 md:gap-16 mt-8">

        {/* Items Section (Address, Phone, Hours) */}
        {items && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 group"
              >
                {item.icon && (
                  <div className="w-14 h-14 rounded-2xl bg-[#E1F5FE] text-[#032B53] flex items-center justify-center shadow-sm group-hover:bg-[#032B53] group-hover:text-white transition-colors duration-300">
                    <item.icon size={28} />
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-bold text-[#032B53] tracking-tight">{item.title}</h3>
                  <div className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                    {item.description && (Array.isArray(item.description) ? item.description.map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    )) : <p>{item.description}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="flex justify-center">
          <Form {...form} containerClass="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-slate-100 w-full max-w-3xl mx-auto" btnPosition="right" />
        </div>

        {/* Contact Info + Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#032B53] via-[#043d75] to-[#064273] rounded-2xl shadow-xl p-8 text-white gap-6">

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 text-white/90 text-sm font-medium items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#1cb6cd]">
                <FaMapMarkerAlt size={18} />
              </div>
              <span>West Nile Region, Uganda</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#1cb6cd]">
                <FaEnvelope size={18} />
              </div>
              <span>inquirieswnetf@gmail.com | info@wnetf.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#1cb6cd]">
                <FaPhone size={18} />
              </div>
              <span>+256 772 603 162</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { icon: FaFacebook, href: '#' },
              { icon: FaInstagram, href: '#' },
              { icon: FaYoutube, href: '#' },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#1cb6cd] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

        </div>

        {/* Google Map */}
        <div className="w-full h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
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
