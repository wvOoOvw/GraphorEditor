import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {
  xhrLoading: false,
  message: '',

  userInformation: {
    account: undefined,
    token: undefined
  }
}

export default ImitationINS