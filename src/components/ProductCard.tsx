'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  location: string;
  colors: string[];
  sizes: string[];
  isInStock: boolean;
  onAddToCart?: (id: string) => void;
  onView?: (id: string) => void;
  onLike?: (id: string) => void;
}

const ProductCard = ({
  id,
  title,
  price,
  image,
  rating = 4.6,
  location = 'القاهرة',
  colors = ['#3B82F6', '#F59E0B', '#EF4444', '#10B981'],
  sizes = ['S', 'M', 'L', 'XL'],
  isInStock = true,
  onAddToCart,
  onView,
  onLike,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(id);
  };

  const handleView = () => {
    onView?.(id);
  };

  return (
    <div className="max-w-md w-full bg-slate-900 shadow-sm rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="flex flex-col">
        <div>
          <div className="relative h-62 w-full mb-3">
            <div className="absolute flex flex-col top-3 right-3 z-10">
              <button
                onClick={handleLike}
                className="transition ease-in duration-300 bg-slate-800 hover:text-red-500 shadow hover:shadow-md text-slate-400 hover:text-red-500 rounded-full w-8 h-8 text-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={isLiked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="flex-auto justify-evenly">
            <div className="flex flex-wrap">
              <div className="w-full flex-none text-sm flex items-center text-slate-300 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-slate-300 whitespace-nowrap mr-3">
                  {rating}
                </span>
                <span className="mr-2 text-slate-300">{location}</span>
              </div>

              <div className="flex items-center w-full justify-between min-w-0 mb-3">
                <h2 className="text-lg mr-auto cursor-pointer text-slate-200 hover:text-blue-400 truncate transition-colors duration-300">
                  {title}
                </h2>
                <div
                  className={`flex items-center text-white text-xs px-2 py-1 ml-3 rounded-lg font-semibold ${
                    isInStock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {isInStock ? 'متوفر' : 'غير متوفر'}
                </div>
              </div>
            </div>

            <div className="text-xl text-white font-semibold mt-1 mb-4">
              {price.toLocaleString('ar-EG')} جنيه
            </div>

            <div className="lg:flex py-4 text-sm text-slate-300">
              {/* Color Selection */}
              <div className="flex-1 inline-flex items-center mb-3">
                <div className="w-full flex-none text-sm flex items-center text-slate-400 mb-2">
                  <span className="ml-3">اللون</span>
                  <ul className="flex flex-row justify-center items-center space-x-2">
                    {colors.map((color, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setSelectedColor(color)}
                          className={`block p-1 border-2 rounded-full transition ease-in duration-300 ${
                            selectedColor === color
                              ? 'border-blue-500'
                              : 'border-slate-700 hover:border-blue-400'
                          }`}
                        >
                          <span
                            className="block w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          ></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Size Selection */}
              <div className="flex-1 inline-flex items-center mb-3">
                <span className="text-slate-400 whitespace-nowrap mr-3">
                  المقاس
                </span>
                <div className="cursor-pointer text-slate-400">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`hover:text-blue-400 p-1 py-0 transition-colors duration-300 ${
                        selectedSize === size ? 'text-blue-400' : ''
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 text-sm font-medium justify-start gap-3">
              <button
                onClick={handleAddToCart}
                className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-600 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-blue-700"
              >
                <span>أضف للسلة</span>
              </button>
              <button
                onClick={handleView}
                className="transition ease-in duration-300 bg-slate-700 hover:bg-slate-600 border hover:border-slate-500 border-slate-700 hover:text-white hover:shadow-lg text-slate-400 rounded-full w-9 h-9 text-center p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
