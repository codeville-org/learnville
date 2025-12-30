import type { Access } from 'payload'

import { checkRole } from './check-role'

const user: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor', 'instructor'], user)) {
      return true
    }

    return { id: { equals: user?.id } }
  }

  return false
}

export default user
