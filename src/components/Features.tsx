import React from 'react';
import { Truck, ShieldCheck, Headphones, Package, CreditCard, Tag } from 'lucide-react';

// Card component from shadcn/ui (mocked for this example)
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`p-6 flex flex-col items-start gap-4 ${className}`}>
    {children}
  </div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}
const CardTitle = ({ children, className = '' }: CardTitleProps) => (
  <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-50 ${className}`}>{children}</h3>
);

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}
const CardDescription = ({ children, className = '' }: CardDescriptionProps) => (
  <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>
);

// FeatureCard component
type FeatureCardProps = {
  icon: React.ReactElement;
  title: string;
  description: string;
};
const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg">
    <CardHeader>
      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
        {React.cloneElement(icon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" } as any)}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

// Main App component
export default function App() {
  const features = [
    {
      icon: <Truck />,
      title: 'Fast & Free Shipping',
      description: 'Get your orders delivered to your doorstep in record time, with no extra shipping costs on orders over $50.'
    },
    {
      icon: <ShieldCheck />,
      title: 'Secure Payments',
      description: 'Shop with confidence. Our secure payment gateway ensures your transaction data is always safe.'
    },
    {
      icon: <Headphones />,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is here to help you around the clock with any questions or issues.'
    },
    {
      icon: <Package />,
      title: 'Easy Returns & Refunds',
      description: 'Not satisfied with your purchase? We offer a hassle-free return and refund policy within 30 days.'
    },
    {
      icon: <CreditCard />,
      title: 'Flexible Payment Options',
      description: 'Pay your way. We accept all major credit cards, PayPal, and other popular payment methods.'
    },
    {
      icon: <Tag />,
      title: 'Exclusive Deals & Offers',
      description: 'Unlock special discounts and exclusive deals by signing up for our loyalty program.'
    }
  ];

  return (
    <div className="bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Why Shop With Us?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            We provide an unparalleled shopping experience with features designed to make you happy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
