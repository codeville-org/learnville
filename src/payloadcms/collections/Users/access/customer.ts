import type { Access } from 'payload'

import { checkRole } from './check-role'

const customer: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'instructor'], user)) {
      return true
    }

    return { customer: { equals: user?.id } }
  }

  return false
}

export default customer
