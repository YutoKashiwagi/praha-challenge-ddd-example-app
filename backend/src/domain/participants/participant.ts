import { ParticipantMailAddress } from "./participantMailAddress"
import { ParticipantName } from "./participantName"
import { ParticipantStatus } from "./participantStatus"
import { ParticipantID } from "./paticipantID"

export class Participant {
  // id
  // MailAddress
  // Name
  // Status
  constructor(
    private id: ParticipantID,
    private mailAddress: ParticipantMailAddress,
    private name: ParticipantName,
    private status: ParticipantStatus
    ) {}

  
}
