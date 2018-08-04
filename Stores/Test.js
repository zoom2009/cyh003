import {observable, action, computed, decorate} from 'mobx'

class Test {
    name = ''
    age = -1
    sex = false


    get Yearborn() {
        return (new Date().getFullYear()) - this.age
    }

}

decorate(Test, {
    name: observable,
    age: observable,
    sex: observable,
    Yearborn: computed
})

const test = new Test();
export default test;