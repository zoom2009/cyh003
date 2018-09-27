import {observable, action, computed, decorate} from 'mobx'

class CarState {
    curID = 'none'
    mac_address = 'none'
    date = ''
    time = ''
    carID = ''
    carStatus = 'รถไม่เคลื่อนที่'
    kidStatus = 'เด็กไม่อยู่ในรถ'
    lat = 99.99
    lng = 99.99
    temp = 99.99
    carStatusColor = '#000'
    token = 'none'

    //user profile data
    firstName = ''
    lastName = ''
    picURL = ''
    phone_number = ''
    home_lat = 99.99
    home_lng = 99.99
    school_lat = 99.99
    school_lng = 99.99
    //==============================
    
    setlat(l) {
        this.lat = l
    }

    setCarState(data) {
        this.date = data.date
        this.time = data.time
        this.carID = data.id
        this.lat = data.lat
        this.lng = data.lng
        this.temp = data.temp
        this.carStatus = data.carStatus
        this.kidStatus = data.kidStatus
    }

    setProfileData(data) {
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.picURL = data.picURL
        this.phone_number = data.phone_number
        this.home_lat = data.home_lat
        this.home_lng = data.home_lng
        this.school_lat = data.school_lat
        this.school_lng = data.school_lng
    }
}

decorate(CarState, {
    carID: observable,
    mac_address: observable,
    date: observable,
    time: observable,
    carID: observable,
    carStatus: observable,
    kiddStatus: observable,
    lat: observable,
    lng: observable,
    temp: observable,
    setlat: action,
    setCarState: action,
    token: observable,

    //profile data
    firstName : observable,
    lastName: observable,
    picURL: observable,
    phone_number: observable,
    home_lat: observable,
    home_lng: observable,
    school_lat: observable,
    school_lng: observable
})

const carState = new CarState();
export default carState;