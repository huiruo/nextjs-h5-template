import ReactModal from "react-modal"

interface IModal {
  isOpen: boolean
  handleOpen?: () => void
  handleClose: () => void
  children: JSX.Element
  height: string
}

export function ModalBasic(props: IModal) {
  const { isOpen, handleClose, handleOpen, children } = props

  return <ReactModal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="Modal"
    shouldCloseOnOverlayClick={false}
    style={{
      overlay: {
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      content: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        height: props.height,
        zIndex: 999,
        padding: 0,
        border: 0,
        backgroundColor: 'transparent',
      }
    }}
  >
    {children}
  </ReactModal>
}