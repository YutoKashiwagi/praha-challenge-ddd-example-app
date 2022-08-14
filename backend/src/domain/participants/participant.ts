import { ParticipantMailAddress } from './participantMailAddress'
import { ParticipantName } from './participantName'
import { ParticipantStatus } from './participantStatus'
import { ParticipantID } from './paticipantID'

type props = {
  id: ParticipantID
  mailAddress: ParticipantMailAddress
  name: ParticipantName
  status: ParticipantStatus
}
export class Participant {
  private _id: ParticipantID
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

  public isActive() {
    // status側に判定ロジックを持たせるべきか悩む
    return this._status.value() === '在籍中'
  }
}
