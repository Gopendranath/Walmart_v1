import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface Category {
    id: number;
    name: string;
    image: string;
}


// --- Main Category Component ---

const CategorySection: React.FC = () => {
    // State for storing categories, loading status, and errors
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories from the API when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/categories');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Category[] = await response.json();
                // We'll limit to a reasonable number, e.g., 10, for a clean look
                setCategories(data.slice(0, 5));
            } catch (e) {
                console.error("Failed to fetch categories:", e);
                setError("Could not load categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array means this effect runs once on mount

    // Function to handle image loading errors
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // Prevent infinite loop if placeholder fails
        e.currentTarget.src = `https://placehold.co/400x400/F1F5F9/94A3B8?text=Image+Not+Found`;
        e.currentTarget.classList.add('object-contain'); // Adjust fitting for placeholder text
    };
    
    // Skeleton loader for when data is being fetched
    const renderSkeletons = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 animate-pulse">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
        ));
    };
    
    // Render error message if fetching fails
    if (error) {
        return (
            <div className="text-center py-10 px-4">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const navigate = useNavigate();

    const handleCategoryClick = (category: Category) => {
        navigate(`/${category.id}/category`);
    };
    
    return (
        <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-xl font-bold text-foreground mb-6">
                Shop by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                {loading ? renderSkeletons() : categories.map((category) => (
                    <a 
                        key={category.id} 
                        href="#" 
                        className="group flex flex-col items-center text-center p-2 rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-lg outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                        onClick={(e) => e.preventDefault()} // Prevent navigation for this demo
                    >
                        <div onClick={() => handleCategoryClick(category)} className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 p-1 border-2 border-transparent group-hover:border-primary/30 rounded-full overflow-hidden transition-all duration-300 bg-card outline-none">
                           <img
                                src={category.image}
                                alt={category.name}
                                onError={handleImageError}
                                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300 outline-none "
                            />
                        </div>
                        <h3 className="mt-4 text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {category.name}
                        </h3>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;