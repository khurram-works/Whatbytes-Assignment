"use client";


interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onPriceChange,
}: FilterSidebarProps) {
  const categories = ["All", "Electronics", "Clothing", "Home"];


  const filterContent = (isMobile: boolean) => (
    <div className="flex flex-col gap-6 p-5 bg-sidebar">
      <div className="flex flex-col gap-2">
        <h3 className="text-label-lg text-text-primary">Category</h3>
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={isMobile ? "category-mobile" : "category-desktop"} 
              checked={category === selectedCategory}
              onChange={() => onCategoryChange(category)}
              className="accent-blue-700"
            />
            <span className="text-label-sm text-text-primary">{category}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-label-lg text-text-primary">Price</h3>
        <input
          type="range"
          min={0}
          max={1000}
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full cursor-pointer accent-blue-700"
        />
        <div className="text-label-sm text-text-secondary flex justify-between">
          <span>0</span>
          <span>{maxPrice}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 h-full z-40 w-64
        transform transition-transform duration-300
        lg:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="bg-primary px-5 py-4 flex items-center justify-between">
          <h2 className="text-section-title text-content">Filters</h2>
          <button
            className="text-content/70 hover:text-content"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {filterContent(true)} 
      </div>

      <div className="hidden lg:block w-52 flex-shrink-0 sticky top-24 self-start h-fit rounded-md overflow-hidden shadow-sm">
        <div className="bg-primary px-5 py-4 rounded-t-md">
          <h2 className="text-section-title text-content">Filters</h2>
        </div>
        {filterContent(false)} 
      </div>
    </>
  );
}
