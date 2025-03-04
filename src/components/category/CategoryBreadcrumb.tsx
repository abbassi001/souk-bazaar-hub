
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../ui/breadcrumb';

interface CategoryBreadcrumbProps {
  categoryName: string;
}

const CategoryBreadcrumb = ({ categoryName }: CategoryBreadcrumbProps) => {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Home className="h-4 w-4" />
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight className="h-4 w-4" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/categories">Catégories</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight className="h-4 w-4" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink>{categoryName}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default CategoryBreadcrumb;
