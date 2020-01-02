export const state = ()  => ({
  character: {
    name: ''
  }
});

export  const mutations = {
  setName (name) {
    state.character.name = name
  }
}
