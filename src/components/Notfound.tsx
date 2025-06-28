import { Button } from './ui/button';

const Notfound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-foreground font-sans text-center p-8 transition-colors duration-300"
    >
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" className="fill-primary" />
        <path d="M9.17 9.17a3 3 0 0 1 5.66 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="9" cy="13.5" rx="1" ry="1.5" fill="#fff" />
        <ellipse cx="15" cy="13.5" rx="1" ry="1.5" fill="#fff" />
        <path d="M9 17c1.333 1 4.667 1 6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <h1 className="text-5xl mt-4 mb-2 font-bold">404</h1>
      <h2 className="text-2xl mb-6 font-medium">Page Not Found</h2>
      <p className="max-w-md mx-auto mb-8 text-muted-foreground">
        Oops! The page you are looking for does not exist or has been moved.<br />
        Let’s get you back to the homepage.
      </p>
      <Button asChild className="rounded-full px-8 py-3 text-base font-semibold shadow-lg">
        <a href="/">Go Home</a>
      </Button>
    </div>
  );
};

export default Notfound;