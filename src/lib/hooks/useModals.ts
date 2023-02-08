import { toast, TypeOptions } from 'react-toastify'

interface IUseNotificationParams {
  type: TypeOptions // 'info' | 'success' | 'warning' | 'error' | 'default'
  message: string
}

export const useNotification = ({ type, message } :IUseNotificationParams) => {
  const TYPE_NOTIFICATIONS = {
    info: toast.info(message),
    success: toast.success(message),
    warning: toast.warning(message),
    error: toast.error(message),
    default: toast(message)
  }

  TYPE_NOTIFICATIONS[type] || toast(message)
}
