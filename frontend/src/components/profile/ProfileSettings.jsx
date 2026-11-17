import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateMe, changeEmail, changePassword, deactivateMe, logout } from '../../redux/authSlice'
import { toast } from 'react-toastify'
import ProfileActions from './ProfileActions'
import ProfileNameModal from './ProfileNameModal'
import ProfileEmailModal from './ProfileEmailModal'
import ProfilePasswordModal from './ProfilePasswordModal'
import ProfileDeactivateModal from './ProfileDeactivateModal'

// Botones, modales y avisos de la cuenta. Las llamadas salen de acá; el slice guarda el usuario y el token
function ProfileSettings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  const [modal, setModal] = useState(null) // null | 'name' | 'email' | 'password' | 'deactivate'
  const [error, setError] = useState('')

  const openModal = (name) => {
    setError('')
    setModal(name)
  }

  const handleResult = (result, message) => {
    if (result.error) {
      setError(result.error.message)
      return
    }
    toast.success(message)
    setModal(null)
  }

  const handleName = (form) => {
    dispatch(updateMe({ token, updateData: form })).then((result) => handleResult(result, 'Datos actualizados'))
  }

  const handleEmail = (form) => {
    dispatch(changeEmail({ token, emailData: form })).then((result) => handleResult(result, 'Email actualizado'))
  }

  const handlePassword = (form) => {
    dispatch(changePassword({ token, passwordData: form })).then((result) => handleResult(result, 'Contraseña actualizada'))
  }

  const handleDeactivate = (form) => {
    dispatch(deactivateMe({ token, passwordData: form })).then((result) => {
      if (result.error) {
        setError(result.error.message)
        return
      }
      dispatch(logout())
      navigate('/')
    })
  }

  const closeModal = () => setModal(null)

  return (
    <>
      <ProfileActions onOpen={openModal} />
      {modal === 'name' && <ProfileNameModal user={user} error={error} onSave={handleName} onClose={closeModal} />}
      {modal === 'email' && <ProfileEmailModal error={error} onSave={handleEmail} onClose={closeModal} />}
      {modal === 'password' && <ProfilePasswordModal error={error} onSave={handlePassword} onClose={closeModal} />}
      {modal === 'deactivate' && <ProfileDeactivateModal error={error} onConfirm={handleDeactivate} onClose={closeModal} />}
    </>
  )
}

export default ProfileSettings
