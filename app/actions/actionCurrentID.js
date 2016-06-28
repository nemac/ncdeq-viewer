
export function set_CurrentID(ID) {
  return {
    type: 'SET_CURRENT_ID',
    current_id: ID,
    receivedAt: Date.now()
  }
}
