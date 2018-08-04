import {observable, action, computed, decorate} from 'mobx'

class CarState {
    mac_address = ''
    date = ''
    time = ''
    carID = ''
    carStatus = 'รถไม่เคลื่อนที่'
    kidStatus = 'เด็กไม่อยู่ในรถ'
    lat = 99.99
    lng = 99.99
    temp = 99.99
    carStatusColor = '#000'

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
}

decorate(CarState, {
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
    setCarState: action
})

const carState = new CarState();
export default carState;