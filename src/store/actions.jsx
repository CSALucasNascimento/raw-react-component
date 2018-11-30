const SWITCH_USER = 'SWITCH_USER';

function switchUser(user) {
  return {
    type: SWITCH_USER,
    user
  }
}

export { SWITCH_USER }
export { switchUser }
