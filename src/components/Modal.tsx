import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useOutsideClick } from '@/hooks/useOutsideClick'

interface ModalContextType {
  openName: string
  close: () => void
  open: (name: string) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProps {
  children: ReactNode
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>('')
  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

interface OpenProps {
  children: (props: { onOpenWindow: () => void }) => ReactElement
  opens: string
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('Open must be used within a Modal')
  }

  const { open } = context
  return children({ onOpenWindow: () => open(opensWindowName) })
}

interface WindowProps {
  children: (props: { onCloseModal: () => void }) => ReactElement
  name: string
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Window must be used within a Modal')
  }
  const { openName, close } = context
  const ref = useOutsideClick<HTMLDivElement>(close)

  if (name !== openName) return null

  return createPortal(
    <div className='fixed inset-0 w-full h-screen bg-black/10 backdrop-blur-sm z-[1000] transition-all duration-500'>
      <div
        ref={ref}
        className='fixed top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl px-16 py-12 transition-all duration-500'
      >
        <button
          onClick={close}
          className='absolute top-5 right-8 p-2 rounded-full  hover:bg-gray-100 transition-colors duration-200 text-gray-400 hover:text-gray-600 transform translate-x-2'
        >
          <X size={20} />
        </button>
        <div>{children({ onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
