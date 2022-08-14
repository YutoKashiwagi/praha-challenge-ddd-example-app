import { ParticipantMailAddress } from "./participantMailAddress"
import { ParticipantName } from "./participantName"
import { ParticipantStatus } from "./participantStatus"
import { ParticipantID } from "./paticipantID"


type props = {
  id: ParticipantID
  mailAddress: ParticipantMailAddress
  name: ParticipantName
  status: ParticipantStatus
}
export class Participant {
  private id: ParticipantID
  private mailAddress: ParticipantMailAddress
  private name: ParticipantName
  private status: ParticipantStatus

  constructor(props: props) {
    this.id = props.id
    this.mailAddress = props.mailAddress
    this.name = props.name
    this.status = props.status
  }

  public isActive() {
    // status側に判定ロジックを持たせるべきか悩む
    return this.status.value() === '在籍中'
  }
}
