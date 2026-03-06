import { IconChevronRight } from '@tabler/icons-react';
import { CallToActionProps } from '~/shared/types';

const CallToAction2 = ({ title, subtitle, callToAction, image }: CallToActionProps) => (
  <section className="bg-primary-900 text-gray-200" id="callToActionTwo">
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT — Text */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
          <p className="text-lg md:text-xl text-gray-200">{subtitle}</p>

          {/* Optional CTA button */}
          {callToAction && (
            <a
              href={callToAction.href}
              className="inline-block rounded bg-white px-6 py-3 font-semibold text-primary-900 hover:bg-gray-200 transition"
            >
              {callToAction.text}
            </a>
          )}
        </div>

        {/* RIGHT — Image */}
         <div className="flex justify-center md:justify-end">
          <img
            src="/images/runadvert.jpg" 
            alt="Charity Run Advertisement"
            className="rounded-lg shadow-lg max-w-[400px] w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
);

export default CallToAction2;
