export const state = () => ({
  name: 'Ryan'
})

export const mutations = {
  setName(state, text){
    state.character.name = text;
  }
}
