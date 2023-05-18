import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [ data, setData ] = useState({});

  async function signIn({ email, password }) {
    
    try {
      const response = await api.post('/sessions', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
      localStorage.setItem('@rocketnotes:token', token);

      api.defaults.headers.authorizantion = `Bearer ${token}`; //Insere token por padrão em todas as reqs do usuário
      setData({ user, token });

    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
          alert('Não foi possível realizar o login.');
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('@rocketnotes:token');
    const user = localStorage.getItem('@rocketnotes:user');

    if(user && token) {
      api.defaults.headers.authorizantion = `Bearer ${token}`;

      setData({ 
        token, 
        user: JSON.parse(user)
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}>
      {children} 
    </AuthContext.Provider>
  );

}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };