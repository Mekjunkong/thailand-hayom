import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
      <Button
        variant={language === 'he' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('he')}
        className={`rounded-full px-3 py-2 transition-all ${
          language === 'he' 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'hover:bg-gray-100'
        }`}
        title="עברית"
      >
        <span className="text-xl">🇮🇱</span>
        <span className="ml-1 text-sm font-medium">עברית</span>
      </Button>
      
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-2 transition-all ${
          language === 'en' 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'hover:bg-gray-100'
        }`}
        title="English"
      >
        <span className="text-xl">🇬🇧</span>
        <span className="ml-1 text-sm font-medium">English</span>
      </Button>
    </div>
  );
}
