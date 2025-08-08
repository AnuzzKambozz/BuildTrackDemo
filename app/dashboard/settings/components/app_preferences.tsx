"use client";
interface AppPreferencesProps {
    theme: string;
    setTheme: (theme: string) => void;
    language: string;
    setLanguage: (language: string) => void;
  }


// App Preferences Component
const AppPreferences: React.FC<AppPreferencesProps> = ({ 
    theme, 
    setTheme, 
    language, 
    setLanguage 
  }) => {
    return (
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          App Preferences
        </h2>
        <div className='border-b mb-6'/>
   
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Theme
            </label>
            <div className="relative">
              <select
                value={theme}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white pr-8"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Auto">Auto</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
  
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white pr-8"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default AppPreferences;