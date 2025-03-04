
interface CategoryHeaderProps {
  categoryName: string;
  productCount: number;
  isLoading: boolean;
}

const CategoryHeader = ({ categoryName, productCount, isLoading }: CategoryHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-souk-900 mb-4">
        {categoryName}
      </h1>
      
      {!isLoading && productCount > 0 && (
        <p className="max-w-2xl mx-auto text-souk-700">
          Découvrez notre collection de {productCount} produits artisanaux dans la catégorie {categoryName.toLowerCase()}.
        </p>
      )}
    </div>
  );
};

export default CategoryHeader;
