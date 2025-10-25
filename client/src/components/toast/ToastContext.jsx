import { createContext, useContext, useState, useCallback } from 'react'

const ToastCtx = createContext()

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])
  const show = useCallback((message, type='info', timeout=2500)=>{
    const id = Math.random().toString(36).slice(2)
    setToasts(t=>[...t, { id, message, type }])
    setTimeout(()=> setToasts(t=> t.filter(x=>x.id!==id)), timeout)
  },[])

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(t=> (
          <div key={t.id} className={`rounded-md px-4 py-2 text-sm shadow-md border ${t.type==='error'?'bg-red-600 text-white border-red-700': t.type==='success'?'bg-green-600 text-white border-green-700':'bg-gray-900 text-white border-gray-800'}`}>{t.message}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast(){ return useContext(ToastCtx) }
