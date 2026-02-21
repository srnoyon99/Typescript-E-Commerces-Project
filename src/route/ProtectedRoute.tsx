import type { ReactNode } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Navigate, useLocation } from "react-router"

interface ProtectedRouteProps {
     children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
     const { currentUser, loading } = useAuth()
     const location = useLocation()

     if (loading) {
          return (
               <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-button2 mx-auto"></div>
                         <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
                    </div>
               </div>
          )
     }

     if (!currentUser) {
          return <Navigate to={"/auth/login"} state={{ from: location }} replace />
     }

     return <>{children}</>
}

export default ProtectedRoute
