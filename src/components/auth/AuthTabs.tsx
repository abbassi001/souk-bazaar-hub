
interface AuthTabsProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  isSubmitting: boolean;
}

const AuthTabs = ({ isLogin, setIsLogin, isSubmitting }: AuthTabsProps) => {
  return (
    <div className="flex border-b border-souk-200 mb-6">
      <button
        type="button"
        className={`flex-1 py-3 font-medium text-center transition-colors ${
          isLogin ? 'text-souk-700 border-b-2 border-souk-700' : 'text-souk-500'
        }`}
        onClick={() => setIsLogin(true)}
        disabled={isSubmitting}
      >
        Connexion
      </button>
      <button
        type="button"
        className={`flex-1 py-3 font-medium text-center transition-colors ${
          !isLogin ? 'text-souk-700 border-b-2 border-souk-700' : 'text-souk-500'
        }`}
        onClick={() => setIsLogin(false)}
        disabled={isSubmitting}
      >
        Inscription
      </button>
    </div>
  );
};

export default AuthTabs;
