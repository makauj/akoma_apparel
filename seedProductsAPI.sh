#!/bin/bash

# Akoma Apparel Product Seeding Script
# This script adds sample products to your database via API calls

API_BASE_URL="http://localhost:5000/api"

echo "🌱 Starting product seeding via API..."

# Function to add a product
add_product() {
    local name="$1"
    local description="$2"
    local price="$3"
    local category="$4"
    local subcategory="$5"
    local brand="$6"
    local images="$7"
    local colors="$8"
    local sizes="$9"
    local material="${10}"
    local gender="${11}"
    
    curl -s -X POST "$API_BASE_URL/products" \
        -H "Content-Type: application/json" \
        -d "{
            \"name\": \"$name\",
            \"description\": \"$description\",
            \"price\": $price,
            \"category\": \"$category\",
            \"subcategory\": \"$subcategory\",
            \"brand\": \"$brand\",
            \"images\": $images,
            \"colors\": $colors,
            \"sizes\": $sizes,
            \"material\": \"$material\",
            \"gender\": \"$gender\",
            \"inStock\": true,
            \"stockQuantity\": 100
        }" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Added: $name"
    else
        echo "❌ Failed to add: $name"
    fi
}

# Women's Products
add_product "Elegant Wrap Dress" "Sophisticated wrap dress with a flattering silhouette. Perfect for office or dinner dates." 95.99 "Women" "Dresses" "Akoma Elegance" "[\"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500\"]" "[\"Black\", \"Navy\", \"Burgundy\"]" "[\"XS\", \"S\", \"M\", \"L\", \"XL\"]" "Polyester blend" "Women"

add_product "Silk Camisole" "Luxurious silk camisole with delicate lace trim. Versatile piece that can be dressed up or down." 79.99 "Women" "Tops" "Akoma Luxury" "[\"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500\"]" "[\"Ivory\", \"Blush\", \"Champagne\"]" "[\"XS\", \"S\", \"M\", \"L\", \"XL\"]" "Silk" "Women"

add_product "High-Rise Skinny Jeans" "Premium stretch denim jeans with a flattering high-rise fit. Comfortable all-day wear." 84.99 "Women" "Bottoms" "Akoma Denim" "[\"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500\"]" "[\"Dark Wash\", \"Medium Wash\", \"Black\"]" "[\"24\", \"26\", \"28\", \"30\", \"32\", \"34\"]" "Cotton blend" "Women"

add_product "Cashmere Cardigan" "Ultra-soft cashmere cardigan with a relaxed fit. Perfect for layering over dresses or with jeans." 199.99 "Women" "Sweaters" "Akoma Luxury" "[\"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500\"]" "[\"Camel\", \"Gray\", \"Cream\", \"Navy\"]" "[\"XS\", \"S\", \"M\", \"L\", \"XL\"]" "Cashmere" "Women"

# Men's Products
add_product "Classic Oxford Shirt" "Timeless Oxford shirt crafted from premium cotton. Essential for business and casual wear." 69.99 "Men" "Shirts" "Akoma Essentials" "[\"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500\"]" "[\"White\", \"Light Blue\", \"Navy\", \"Pink\"]" "[\"S\", \"M\", \"L\", \"XL\", \"XXL\"]" "Cotton" "Men"

add_product "Tailored Chinos" "Modern tailored chinos with a comfortable fit. Versatile pants for casual and semi-formal occasions." 79.99 "Men" "Pants" "Akoma Tailored" "[\"https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500\"]" "[\"Khaki\", \"Navy\", \"Olive\", \"Charcoal\"]" "[\"30\", \"32\", \"34\", \"36\", \"38\", \"40\"]" "Cotton blend" "Men"

add_product "Wool Blazer" "Sophisticated wool blazer with a modern cut. Perfect for business meetings and formal events." 279.99 "Men" "Blazers" "Akoma Formal" "[\"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500\"]" "[\"Navy\", \"Charcoal\", \"Brown\"]" "[\"38\", \"40\", \"42\", \"44\", \"46\"]" "Wool" "Men"

add_product "Merino Wool Sweater" "Premium merino wool sweater with exceptional softness. Perfect for layering or wearing alone." 159.99 "Men" "Sweaters" "Akoma Wool" "[\"https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500\"]" "[\"Charcoal\", \"Navy\", \"Forest Green\", \"Burgundy\"]" "[\"S\", \"M\", \"L\", \"XL\", \"XXL\"]" "Merino wool" "Men"

# Kids' Products
add_product "Rainbow Stripe Dress" "Cheerful rainbow stripe dress made from soft organic cotton. Perfect for playtime and special occasions." 34.99 "Kids" "Dresses" "Akoma Kids" "[\"https://images.unsplash.com/photo-1503944168605-ac03aaec1579?w=500\"]" "[\"Rainbow\", \"Pink Stripes\", \"Blue Stripes\"]" "[\"2T\", \"3T\", \"4T\", \"5T\", \"6\", \"7\", \"8\"]" "Organic cotton" "Kids"

add_product "Superhero Cape T-Shirt" "Fun superhero-themed t-shirt with detachable cape. Encourages imaginative play." 29.99 "Kids" "Tops" "Akoma Heroes" "[\"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500\"]" "[\"Blue\", \"Red\", \"Green\", \"Purple\"]" "[\"2T\", \"3T\", \"4T\", \"5T\", \"6\", \"7\", \"8\"]" "Cotton" "Kids"

# Accessories
add_product "Leather Tote Bag" "Spacious leather tote bag perfect for work or weekend. Features multiple compartments and sturdy handles." 149.99 "Accessories" "Bags" "Akoma Leather" "[\"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500\"]" "[\"Black\", \"Brown\", \"Tan\", \"Navy\"]" "[\"One Size\"]" "Leather" "Unisex"

add_product "Silk Square Scarf" "Elegant silk square scarf with artistic prints. Versatile accessory for multiple styling options." 89.99 "Accessories" "Scarves" "Akoma Silk" "[\"https://images.unsplash.com/photo-1591348123637-3b09d2a17465?w=500\"]" "[\"Floral Blue\", \"Geometric Gold\", \"Abstract Red\"]" "[\"One Size\"]" "Silk" "Unisex"

add_product "Wool Fedora Hat" "Classic wool fedora hat with a modern twist. Perfect for adding sophistication to any outfit." 79.99 "Accessories" "Hats" "Akoma Hats" "[\"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500\"]" "[\"Black\", \"Gray\", \"Navy\", \"Camel\"]" "[\"S\", \"M\", \"L\"]" "Wool felt" "Unisex"

# Activewear
add_product "High-Performance Leggings" "Advanced athletic leggings with compression technology. Perfect for yoga, running, and gym workouts." 79.99 "Activewear" "Bottoms" "Akoma Sport" "[\"https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500\"]" "[\"Black\", \"Navy\", \"Charcoal\", \"Purple\"]" "[\"XS\", \"S\", \"M\", \"L\", \"XL\"]" "Polyester blend" "Women"

add_product "Training Shorts" "Lightweight training shorts with built-in compression liner. Ideal for intense workouts and running." 49.99 "Activewear" "Bottoms" "Akoma Sport" "[\"https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500\"]" "[\"Black\", \"Navy\", \"Gray\", \"Royal Blue\"]" "[\"S\", \"M\", \"L\", \"XL\", \"XXL\"]" "Polyester" "Men"

# Formal Wear
add_product "Cocktail Dress" "Stunning cocktail dress with intricate beading. Perfect for evening events and celebrations." 199.99 "Formal" "Dresses" "Akoma Evening" "[\"https://images.unsplash.com/photo-1566479179817-0043e8c26ed4?w=500\"]" "[\"Black\", \"Navy\", \"Burgundy\", \"Emerald\"]" "[\"XS\", \"S\", \"M\", \"L\", \"XL\"]" "Polyester with beading" "Women"

add_product "Three-Piece Suit" "Classic three-piece suit with modern tailoring. Includes jacket, vest, and trousers." 449.99 "Formal" "Suits" "Akoma Formal" "[\"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500\"]" "[\"Navy\", \"Charcoal\", \"Black\"]" "[\"38\", \"40\", \"42\", \"44\", \"46\"]" "Wool blend" "Men"

# Outerwear
add_product "Wool Coat" "Elegant wool coat with classic silhouette. Perfect for cold weather and formal occasions." 299.99 "Outerwear" "Coats" "Akoma Outerwear" "[\"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500\"]" "[\"Black\", \"Camel\", \"Navy\", \"Gray\"]" "[\"XS\", \"S\", \"M\", \"L\", \"XL\"]" "Wool blend" "Women"

add_product "Puffer Jacket" "Warm puffer jacket with water-resistant exterior. Perfect for outdoor activities and winter wear." 149.99 "Outerwear" "Jackets" "Akoma Outdoor" "[\"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500\"]" "[\"Black\", \"Navy\", \"Olive\", \"Burgundy\"]" "[\"S\", \"M\", \"L\", \"XL\", \"XXL\"]" "Nylon with down fill" "Unisex"

echo ""
echo "🎉 Product seeding completed!"
echo "📊 Check your API at: $API_BASE_URL/products"
echo "🌐 View products on frontend at: http://localhost:4324/astro-ecommerce/api-products"
