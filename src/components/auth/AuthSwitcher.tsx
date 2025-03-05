
interface AuthSwitcherProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  isSubmitting: boolean;
}

const AuthSwitcher = ({ isLogin, setIsLogin, isSubmitting }: AuthSwitcherProps) => {
  return (
    <div className="mt-6 text-center text-sm text-souk-600">
      {isLogin ? (
        <p>
          Nouveau sur Souk Market?{' '}
          <button 
            type="button"
            className="text-souk-700 font-medium hover:text-souk-900 hover-underline"
            onClick={() => setIsLogin(false)}
            disabled={isSubmitting}
          >
            Créer un compte
          </button>
        </p>
      ) : (
        <p>
          Déjà un compte?{' '}
          <button 
            type="button"
            className="text-souk-700 font-medium hover:text-souk-900 hover-underline"
            onClick={() => setIsLogin(true)}
            disabled={isSubmitting}
          >
            Se connecter
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthSwitcher;
