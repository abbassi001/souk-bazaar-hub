
import { useState } from 'react';

interface ProductImagesProps {
  images: string[];
  name: string;
}

const ProductImages = ({ images, name }: ProductImagesProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-souk-100">
        <img 
          src={mainImage} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`aspect-square rounded-md overflow-hidden cursor-pointer ${
              mainImage === image ? 'ring-2 ring-souk-700' : 'border border-souk-200'
            }`}
            onClick={() => setMainImage(image)}
          >
            <img 
              src={image} 
              alt={`${name} - View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
