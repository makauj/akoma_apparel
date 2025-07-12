import DesktopHeader from "../components/shared/DesktopHeader.tsx";
import DesktopFooter  from "../components/shared/DesktopFooter.tsx";
import type { ProductListProps}  from "../types/common.ts";
import { Card, CardContent } from "../components/ui/card";
const WomenCategories = [
  {
    name: "Buggy Jeans",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
  },
  {
    name: "Wrap Dress",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
  },
  {
    name: "Work Blouse",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
  },
  {
    name: "Pants",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
  },
  {
    name: "Dresses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
  },
  {
    name: "Blouses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
  },
];
const MenCategories = [
  {
    name: "Buggy Jeans",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
  },
  {
    name: "Wrap Dress",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
  },
  {
    name: "Work Blouse",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
  },
  {
    name: "Pants",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
  },
  {
    name: "Dresses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
  },
  {
    name: "Blouses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
  },
];
const KidsCategories = [
  {
    name: "Buggy Jeans",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
  },
  {
    name: "Wrap Dress",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
  },
  {
    name: "Work Blouse",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
  },
  {
    name: "Pants",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
  },
  {
    name: "Dresses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
  },
  {
    name: "Blouses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
  },
];

const categoryGroups = [
  { title: "Women", items:WomenCategories },
  { title: "Men", items:MenCategories },
  { title: "WomKidsen", items:KidsCategories },
]
function categories() {
      return (
        <>
        {categoryGroups.map((group, idx) => (
          <ProductList key={idx} title={group.title} category={group.items} />
        ))}
        </>
      )
}
function ProductList({title, category}: ProductListProps) {
  return (
  <div>
    <br/><br/><br/>
    <div className="relative border-b border-black w-fit px-8 text-xl  font-bold">
      {title}
    </div><br/>

      <div className="w-full relative flex gap-[63.5px]">
        {category.map((item, index) => (
          <Card key={index} className="border-none shadow-none">
            <CardContent className="p-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-52 h-[420px] object-cover" />
              <p className="mt-3 text-center text-sm font-medium text-black">
                {item.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
  </div>
  )
}
function HomePage() {
  return (
    <div className="bg-[#ffffff] flex flex-col w-full min-h-screen">
      <DesktopHeader />
      {/* Background Image */}
      <div className="bg-white w-[100%] h-[600px] relative">
        <img
          className="absolute w-full h-full top-0 left-0 object-cover"
          alt="Background"
          src="https://d2ysdoq3nznp4y.cloudfront.net/assets/home_background.png" />
      </div>

      {/* Product Listing  */}
      {categories()}

      {/* Footer */}
      <DesktopFooter />
    </div>
  );
}

export default HomePage;
