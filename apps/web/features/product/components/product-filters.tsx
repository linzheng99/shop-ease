import { type CheckedState } from "@radix-ui/react-checkbox";

import PageLoader from "@/components/page-loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductInfo from "@/features/product/components/product-info";
import { useProductFilterStore } from "@/store/use-product-filter-store";

import { useFilterProducts } from "../api/use-filter-products";

interface ProductFiltersProps {
  storeId: string
  categoryCheckboxes: { id: string; label: string }[]
  sizeCheckboxes: { id: string; label: string }[]
  colorCheckboxes: { id: string; label: string }[]
}

export default function ProductFilters({ storeId, categoryCheckboxes, sizeCheckboxes, colorCheckboxes }: ProductFiltersProps) {
  const { values, setValues } = useProductFilterStore()
  const { data: products, isLoading } = useFilterProducts({
    storeId,
    categoryIds: values.categoryIds,
    sizeIds: values.sizeIds,
    colorIds: values.colorIds,
  })


  const handleCategoryChange = (value: CheckedState, categoryId: string) => {
    if (value) {
      setValues('categoryIds', [...values.categoryIds, categoryId])
    } else {
      setValues('categoryIds', values.categoryIds.filter(category => category !== categoryId))
    }
  }

  const handleSizeChange = (value: CheckedState, sizeId: string) => {
    if (value) {
      setValues('sizeIds', [...values.sizeIds, sizeId])
    } else {
      setValues('sizeIds', values.sizeIds.filter(size => size !== sizeId))
    }
  }

  const handleColorChange = (value: CheckedState, colorId: string) => {
    if (value) {
      setValues('colorIds', [...values.colorIds, colorId])
    } else {
      setValues('colorIds', values.colorIds.filter(color => color !== colorId))
    }
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <Accordion type="multiple" defaultValue={['categories', 'sizes', 'colors']} className="col-span-12 lg:col-span-3">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2">
            {categoryCheckboxes?.map(category => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox id={category.id} onCheckedChange={(checked) => handleCategoryChange(checked, category.id)} />
                <Label htmlFor={category.id}>{category.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2">
            {sizeCheckboxes?.map(size => (
              <div key={size.id} className="flex items-center gap-1">
                <Checkbox id={size.id} onCheckedChange={(checked) => handleSizeChange(checked, size.id)} />
                <Label htmlFor={size.id}>{size.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2">
            {colorCheckboxes?.map(color => (
              <div key={color.id} className="flex items-center gap-2">
                <Checkbox id={color.id} onCheckedChange={(checked) => handleColorChange(checked, color.id)} />
                <Label htmlFor={color.id}>{color.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-4 col-span-12 lg:col-span-9">
        {isLoading ? <PageLoader /> : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
              products?.map((product) => (
                <ProductInfo key={product.id} product={product} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}
