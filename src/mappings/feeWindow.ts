// Import APIs from graph-ts
import {Bytes, BigInt, log} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  FeeWindowCreated,
  FeeWindowRedeemed
} from '../types/Augur/Augur'

// Import entity types from the schema
import {Dispute, InitialReport, FeeWindow, Market} from '../types/schema'

export function handleFeeWindowCreated(event: FeeWindowCreated): void {
    let id = event.params.id
    let fw = new FeeWindow(id.toString())

    fw.startTime = event.params.startTime
    fw.endTime = event.params.endTime
    fw.address = event.params.feeWindow
    fw.save()
}

export function handleFeeWindowRedeemed (event: FeeWindowRedeemed): void {
    // nothing for now
}