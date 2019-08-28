// Import APIs from graph-ts
import {Bytes, BigInt} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  DisputeCrowdsourcerCompleted,
  DisputeCrowdsourcerContribution,
  DisputeCrowdsourcerCreated,
  DisputeCrowdsourcerRedeemed
}
  from '../types/Augur/Augur'

// Import entity types from the schema
import {Dispute, InitialReport, User, Token, TokenOwner, Market} from '../types/schema'
import { Market as MarketContract } from '../types/Augur/Market'

export function handleDisputeCrowdsourcerCreated(event: DisputeCrowdsourcerCreated): void {
  let id = event.params.disputeCrowdsourcer.toHex()
  let dc = new Dispute(id)
  let market = Market.load(event.params.market.toHex())

  dc.payoutNumerators = event.params.payoutNumerators
  dc.size = event.params.size
  dc.sizeFilled = BigInt.fromI32(0)
  dc.invalid = event.params.invalid
  dc.market = event.params.market.toHex()

  // get fee window
  let marketContract = MarketContract.bind(event.params.market)
  let feeWindow = marketContract.getFeeWindow()
  // market.feeWindow = feeWindow
  dc.feeWindow = feeWindow.toHex()

  // status handling
  let status = market.status
  market.status = "crowdsourcer created"

  market.save()
  dc.save()
}

export function handleDisputeCrowdsourcerContribution(event: DisputeCrowdsourcerContribution): void {
  let id = event.params.disputeCrowdsourcer.toHex()
  let dc = Dispute.load(id)
  dc.sizeFilled = dc.sizeFilled.plus(event.params.amountStaked as BigInt)
  dc.save()
}

export function handleDisputeCrowdsourcerCompleted(event: DisputeCrowdsourcerCompleted): void {
  let id = event.params.disputeCrowdsourcer.toHex()
  let dc = Dispute.load(id)

  dc.completedBlock = event.block.number
  dc.completedTimestamp = event.block.timestamp
  dc.completed = true

  // market
  let market = Market.load(event.params.market.toHex())
  market.status = "awaiting next window"
  market.feeWindow = dc.feeWindow
  market.rounds = market.rounds.plus(BigInt.fromI32(1))
  market.totalDisputed = market.totalDisputed.plus(dc.size as BigInt)
  market.payoutNumerators = dc.payoutNumerators
  market.invalid = dc.invalid

  market.save()
  dc.save()
}

export function handleDisputeCrowdsourcerRedeemed(event: DisputeCrowdsourcerRedeemed): void {
  let id = event.params.disputeCrowdsourcer.toHex()
  let dc = Dispute.load(id)

  // let amountRedeemed = dc.amountRedeemed
  // amountRedeemed.push(event.params.amountRedeemed)
  // dc.amountRedeemed = amountRedeemed

  // let repReceived = dc.repReceived
  // repReceived.push(event.params.repReceived)
  // dc.repReceived = repReceived

  // let reportingFeesReceived = dc.reportingFeesReceived
  // reportingFeesReceived.push(event.params.reportingFeesReceived)
  // dc.reportingFeesReceived = reportingFeesReceived

  dc.save()
}