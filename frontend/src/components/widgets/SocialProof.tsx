import Image from 'next/image';
import { SocialProofProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';

const SocialProof = ({ images, id, hasBackground = false }: SocialProofProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
    <div className="flex items-center justify-center gap-6 md:gap-9">
      {images &&
        images.map(({ src, alt, link }, index) => (
          <div key={`item-social-proof-${index}`}>
            <a href={link} target="_blank" rel="noopener">
              <Image
                src={src}
                alt={alt}
                className="h-auto w-12 opacity-50 contrast-50  md:w-16"
                object-fit="contain"
                width={64}
                height={64}
                priority
              />
            </a>
          </div>
        ))}
    </div>
  </WidgetWrapper>
);

export default SocialProof;
