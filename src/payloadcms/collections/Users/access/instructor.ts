import type { Access } from 'payload'

import { checkRole } from './check-role'

const instructor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'instructor'], user)) {
      return true
    }
  }

  return false
}

export default instructor
