import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Footer } from '../components/Footer';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useAuth();

  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      {user && (
        <div className="max-w-7xl mx-auto px-4 py-6 bg-indigo-50 mt-6 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-800">Welcome back, {user.name}!</h2>
          <p className="text-indigo-600">
            {user.isAdmin 
              ? 'You have admin access to manage products and orders.' 
              : 'Thank you for shopping with us.'}
          </p>
        </div>
      )}
      
      <FeaturedProducts products={products} />
      
      <main className="max-w-7xl mx-auto px-4 py-12" id="products">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}