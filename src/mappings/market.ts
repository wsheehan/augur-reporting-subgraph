// Import APIs from graph-ts
import {Bytes, BigInt} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  MarketCreated,
  MarketFinalized,
  TradingProceedsClaimed
} from '../types/Augur/Augur'

// Import entity types from the schema
import { Market, User } from '../types/schema'
import { Market as MarketContract } from '../types/Augur/Market'

export function handleMarketCreated(event: MarketCreated): void {
  let id = event.params.market.toHex()
  let market = new Market(id)

  market.finalized = false
  market.rounds = BigInt.fromI32(0)
  market.topic = event.params.topic
  market.description = event.params.description
  market.extraInfo = event.params.extraInfo
  market.marketCreator = event.params.marketCreator.toHex()
  market.outcomes = event.params.outcomes
  market.marketCreationFee = event.params.marketCreationFee

  // timing
  market.createdAt = event.block.timestamp
  let contract = MarketContract.bind(event.params.market)
  market.endTime = contract.getEndTime()
  market.status = "open"

  // naming issue here
  // market.validityBondETH = contract.getValidityBondAttoEth()
  market.totalDisputed = BigInt.fromI32(0)

  market.disputes = new Array<string>()

  let marketTypeEnum = event.params.marketType
  let marketTypeName:string;
  if (marketTypeEnum == 0){
    marketTypeName = "Binary"
  } else if (marketTypeEnum == 1){
    marketTypeName = "Categorical"
  } else {
    marketTypeName = "Scalar"
  }

  market.marketType = marketTypeName

  market.save()

  // User data below
  let userID = event.params.marketCreator.toHex()
  let user = User.load(userID)
  if (user == null){
    user = new User(userID)
    user.marketsCreated  = BigInt.fromI32(0)
    user.initialReports = new Array<string>()
    user.tokensOwned = new Array<string>()
  }
  user.marketsCreated = user.marketsCreated.plus(BigInt.fromI32(1))
  user.save()
}

export function handleMarketFinalized(event: MarketFinalized): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)
  market.finalized = true
  market.status = "finalized"

  market.save()
}
