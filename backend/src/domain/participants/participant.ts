import { UUID } from 'src/util/uuid'
import { ParticipantMailAddress } from './participantMailAddress'
import { ParticipantName } from './participantName'
import { ParticipantStatus } from './participantStatus'

type props = {
  id: UUID
  mailAddress: ParticipantMailAddress
  name: ParticipantName
  status: ParticipantStatus
}
export class Participant {
  private _id: UUID
  private _mailAddress: ParticipantMailAddress
  private _name: ParticipantName
  private _status: ParticipantStatus

  constructor(props: props) {
    this._id = props.id
    this._mailAddress = props.mailAddress
    this._name = props.name
    this._status = props.status
  }

  public id() {
    return this._id.value
  }

  public getAllProperties() {
    return {
      id: this._id.value,
      mailAddress: this._mailAddress.value,
      name: this._name.value,
      status: this._status.value(),
    }
  }

  public isActive() {
    // status側に判定ロジックを持たせるべきか悩む
    return this._status.value() === '在籍中'
  }
}
