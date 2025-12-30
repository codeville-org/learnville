import type { Access } from 'payload'

import { checkRole } from './check-role'

const admin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }

  return false
}

export default admin
