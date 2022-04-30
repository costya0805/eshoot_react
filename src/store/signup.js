import { makeAutoObservable } from "mobx";

class SignUp {
  signUpParams = {
    role: "",
    login: "",
    password: "",
    agreePassword: "",
    name: "",
    surname: "",
  };
  showFill = false;
  showModal = false;
  correctPassword = true;
  passwodsSimilar = true;

  constructor() {
    makeAutoObservable(this);
  }

  changeParams(event) {
    this.signUpParams = {
      ...this.signUpParams,
      [event.target.name]: event.target.value,
    };
  }

  checkPasswords(event) {
    if (event.target.name === "password" && event.target.value.length < 6 && event.target.value.length !== 0)
      this.correctPassword = false;
    if (
      this.signUpParams.agreePassword.length > 0 &&
      this.signUpParams.password.length > 0 &&
      this.signUpParams.agreePassword !== this.signUpParams.password
    )
      this.passwodsSimilar = false;
  }

  refreshSimilar() {
    this.correctPassword = true;
    this.passwodsSimilar = true;
  }

  closeModal(){
    this.showModal = false;
  }
  showError(){
    this.showFill = true
    this.showModal = true
  }

  get checkParams(){
    for (const key in this.signUpParams){
        if (this.signUpParams[key].length === 0){
            this.showError()
            return false
        }
    }
    return true
  }
}
const signUp = new SignUp()
export default signUp;
