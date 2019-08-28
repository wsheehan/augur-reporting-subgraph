// Import APIs from graph-ts
import {Bytes, BigInt} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  InitialReporterTransferred,
  InitialReporterRedeemed,
  InitialReportSubmitted
} from '../types/Augur/Augur'

// Import entity types from the schema
import {InitialReport, User, Market} from '../types/schema'

export function handleInitialReportSubmitted(event: InitialReportSubmitted): void {
  let id = event.params.market.toHex()
  let ir = new InitialReport(id)

  let market = Market.load(id)
  market.status = "initial report submitted"
  market.payoutNumerators = event.params.payoutNumerators
  market.invalid = event.params.invalid
  market.totalDisputed = market.totalDisputed.plus(event.params.amountStaked as BigInt)
  market.save()

  // create user if it doesnt exist
  let userID = event.params.reporter.toHex()
  let user = User.load(userID)
  if (user == null){
    user = new User(userID)
    user.marketsCreated = BigInt.fromI32(0)
    user.initialReports = new Array<string>()
    user.save()
  }

  ir.timestamp = event.block.timestamp
  ir.reporter = user.id
  ir.market = id
  ir.amountStaked = event.params.amountStaked
  ir.isDesignatedReporter = event.params.isDesignatedReporter
  ir.payoutNumerators = event.params.payoutNumerators
  ir.invalid = event.params.invalid
  ir.save()
}

export function handleInitialReporterRedeemed(event: InitialReporterRedeemed): void {
  let id = event.params.market.toHex()
  let ir = InitialReport.load(id)

  ir.amountRedeemed = event.params.amountRedeemed
  ir.repReceived = event.params.repReceived
  ir.reportingFeesReceived = event.params.reportingFeesReceived

  ir.save()
}

export function handleInitialReporterTransferred(event: InitialReporterTransferred): void {
  let id = event.params.market.toHex()
  let ir = InitialReport.load(id)

  // User data below
  let userID = event.params.to.toHex()
  let user = User.load(userID)
  if (user == null){
    user = new User(userID)
    user.marketsCreated = BigInt.fromI32(0)
    user.initialReports = new Array<string>()
    user.tokensOwned = new Array<string>()
    user.save()
  }

  ir.reporter = user.id
  ir.save()
}